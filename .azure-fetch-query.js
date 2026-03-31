#!/usr/bin/env node

/**
 * Azure DevOps Task Fetcher
 * Fetches Active tasks only (State = 'Active')
 */

const https = require('https');

// Read .env file manually
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        process.env[key.trim()] = value;
      }
    });
  }
}

loadEnv();

const AZURE_DEVOPS_PAT = process.env.AZURE_DEVOPS_PAT;
const AZURE_DEVOPS_ORG = process.env.AZURE_DEVOPS_ORG;
const AZURE_DEVOPS_PROJECT = process.env.AZURE_DEVOPS_PROJECT;

if (!AZURE_DEVOPS_PAT || !AZURE_DEVOPS_ORG || !AZURE_DEVOPS_PROJECT) {
  console.error('❌ ERROR: Missing Azure DevOps credentials');
  console.error('Required: AZURE_DEVOPS_PAT, AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT');
  process.exit(1);
}

// WIQL Query to fetch Active tasks only
const wiqlQuery = {
  query: `
    SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType],
           [Microsoft.VSTS.Common.Priority], [System.AssignedTo],
           [System.Description], [System.Tags], [System.AreaPath],
           [System.IterationPath], [Microsoft.VSTS.Common.ValueArea],
           [Microsoft.VSTS.Common.ActivatedDate]
    FROM WorkItems
    WHERE [System.TeamProject] = '${AZURE_DEVOPS_PROJECT}'
      AND [System.State] = 'Active'
      AND [System.WorkItemType] IN ('User Story', 'Task', 'Bug')
    ORDER BY [Microsoft.VSTS.Common.Priority] ASC, [System.ChangedDate] ASC
  `
};

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`:${AZURE_DEVOPS_PAT}`).toString('base64');

    const headers = {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (body) {
      headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }

    const options = {
      hostname: 'dev.azure.com',
      path: `/${AZURE_DEVOPS_ORG}/${path}`,
      method: method,
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function fetchActiveTasks() {
  console.log('🔍 Fetching Active tasks from Azure DevOps...');
  console.log(`📋 Organization: ${AZURE_DEVOPS_ORG}`);
  console.log(`📦 Project: ${AZURE_DEVOPS_PROJECT}`);
  console.log(`✅ Filter: State = 'Active' ONLY\n`);

  try {
    // Step 1: Execute WIQL query to get work item IDs
    console.log('⏳ Step 1: Executing WIQL query...');
    const queryResult = await makeRequest(
      `${AZURE_DEVOPS_PROJECT}/_apis/wit/wiql?api-version=6.0`,
      'POST',
      wiqlQuery
    );

    if (!queryResult.workItems || queryResult.workItems.length === 0) {
      console.log('⚠️  No Active tasks found in Azure DevOps');
      console.log('All tasks may be closed, resolved, or in other states');
      return [];
    }

    console.log(`✅ Found ${queryResult.workItems.length} Active tasks\n`);

    // Step 2: Get work item IDs
    const workItemIds = queryResult.workItems.map(wi => wi.id);
    console.log(`⏳ Step 2: Fetching details for ${workItemIds.length} tasks...`);

    // Step 3: Batch fetch work item details (max 200 at a time)
    const batchSize = 200;
    const batches = [];
    for (let i = 0; i < workItemIds.length; i += batchSize) {
      batches.push(workItemIds.slice(i, i + batchSize));
    }

    let allTasks = [];
    for (const batch of batches) {
      const ids = batch.join(',');
      const detailsResult = await makeRequest(
        `${AZURE_DEVOPS_PROJECT}/_apis/wit/workitems?ids=${ids}&$expand=all&api-version=6.0`
      );

      if (detailsResult.value) {
        allTasks = allTasks.concat(detailsResult.value);
      }
    }

    console.log(`✅ Retrieved details for ${allTasks.length} tasks\n`);

    // Step 4: Format and display tasks
    const formattedTasks = allTasks.map(task => {
      const fields = task.fields;
      return {
        id: task.id,
        url: `https://dev.azure.com/${AZURE_DEVOPS_ORG}/${AZURE_DEVOPS_PROJECT}/_workitems/${task.id}`,
        title: fields['System.Title'] || 'No Title',
        type: fields['System.WorkItemType'] || 'Unknown',
        priority: fields['Microsoft.VSTS.Common.Priority'] || 3,
        assignedTo: fields['System.AssignedTo'] ? fields['System.AssignedTo'].displayName : 'Unassigned',
        status: fields['System.State'] || 'Unknown',
        areaPath: fields['System.AreaPath'] || 'Unknown',
        iterationPath: fields['System.IterationPath'] || 'Unknown',
        description: fields['System.Description'] || '',
        tags: fields['System.Tags'] || '',
        createdDate: fields['System.CreatedDate'] || '',
        changedDate: fields['System.ChangedDate'] || ''
      };
    });

    // Display tasks
    console.log('📋 ACTIVE TASKS (State = Active):\n');
    console.log('━'.repeat(80));

    formattedTasks.forEach((task, index) => {
      console.log(`\n[${index + 1}] ${task.type} - #${task.id}`);
      console.log(`📌 Title: ${task.title}`);
      console.log(`⚡ Priority: ${task.priority} | 👤 Assigned To: ${task.assignedTo}`);
      console.log(`📂 Area: ${task.areaPath}`);
      console.log(`🔗 URL: ${task.url}`);
      console.log('━'.repeat(80));
    });

    console.log(`\n✅ Total: ${formattedTasks.length} Active tasks\n`);

    // Select highest priority task
    if (formattedTasks.length > 0) {
      // Sort by priority (lower number = higher priority), then by changed date
      formattedTasks.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return new Date(a.changedDate) - new Date(b.changedDate);
      });

      const selectedTask = formattedTasks[0];
      console.log('🎯 SELECTED TASK (Highest Priority):');
      console.log('━'.repeat(80));
      console.log(`🆔 ID: ${selectedTask.id}`);
      console.log(`📌 Title: ${selectedTask.title}`);
      console.log(`📦 Type: ${selectedTask.type}`);
      console.log(`⚡ Priority: ${selectedTask.priority}`);
      console.log(`👤 Assigned To: ${selectedTask.assignedTo}`);
      console.log(`📂 Area: ${selectedTask.areaPath}`);
      console.log(`🔗 URL: ${selectedTask.url}`);
      console.log('━'.repeat(80));

      // Output as JSON for programmatic use
      console.log('\n📤 OUTPUT FOR NEXT PHASE:');
      console.log(JSON.stringify(selectedTask, null, 2));
    }

    return formattedTasks;

  } catch (error) {
    console.error('❌ Error fetching tasks:', error.message);
    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('\n💡 Troubleshooting:');
      console.error('1. Check if AZURE_DEVOPS_PAT is valid');
      console.error('2. Verify PAT has Read permissions for Work Items');
      console.error('3. Confirm PAT has not expired');
    }
    process.exit(1);
  }
}

// Run the fetch
fetchActiveTasks();
