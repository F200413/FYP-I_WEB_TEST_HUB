const { GraphQLClient, gql } = require("graphql-request");
const settingClient = new GraphQLClient("http://localhost:9090/query");
const testExecutionClient = new GraphQLClient("http://localhost:8181/query");
const resolvers = {
  Query: {
    getSettingsByID: async (parent, args) => {
      const query = gql`s
        query ($id: ID!) {
          getSettingsByID(id: $id) {
          browser
          version
          stepByStepDebugging
          enableLogs
          parallelism
          # numberOfParallelTests
          }
        }
      `;
      const id = args.id;
      const data = await settingClient.request(query, { id: id });
      return data.getSettingsByID;
    },
    settings: async () => {
      const query = gql`
        query {
          settings {
            id
            browser
            version
            stepByStepDebugging
            enableLogs
            parallelism
            # numberOfParallelTests
          }
        }
      `;
      const data = await settingClient.request(query);
      return data.settings;
    },
    projectInfos: async () => {
      const query = gql`
        query {
          projectInfos {
            id
            gitEmail
            gitProjectName
            gitLanguage
            gitNoOfTestCases
            gitTestCaseFileName
          }
        }
      `;
      const data = await settingClient.request(query);
      return data.projectInfos;
    },
    tests: async () => {
      const query = gql`
        query {
          tests {
            id
            username
            project
            type
            urlid
            testfile
            status
            duration
          }
        }
      `;
      const data = await testExecutionClient.request(query);
      return data.tests;
    }
  },
  Mutation: {
    setSettings: async (parent, args) => {
      const workspace = args.input;
      console.log(workspace);
      const query = gql`
        mutation SetSettings($input: getSettingInput!) {
          setSettings(input: $input) {
          id
          browser
          version
          stepByStepDebugging
          enableLogs
          parallelism
          # numberOfParallelTests
          }
        }
      `;
      const data = await settingClient.request(query, { input: workspace });
      console.log(query);
      console.log(data);
      return data.setSettings;
    },
    setProjectInfo: async (parent, args) => {
      const workspace = args.input;
      console.log(workspace);
      const query = gql`
        mutation SetProjectInfo($input: projectInfoInput!) {
          setProjectInfo(input: $input) {
            id
            gitEmail
            gitLanguage
            gitProjectName
            gitNoOfTestCases
            gitTestCaseFileName
          }
        }
      `;
      const data = await settingClient.request(query, { input: workspace });
      console.log(query);
      console.log(data);
      return data.setProjectInfo;
    },
    cloneGitRepository: async (parent, args) => {
      const repInput = args.input;
      console.log("hi", repInput);
      const query = gql`
        mutation CloneGitRepository($input: cloneGitRepInput!) {
          cloneGitRepository(input: $input)
        }
      `;
      const data = await testExecutionClient.request(query, { input: repInput });
      console.log(query);
      console.log(data);
      return data.cloneGitRepository;
    },