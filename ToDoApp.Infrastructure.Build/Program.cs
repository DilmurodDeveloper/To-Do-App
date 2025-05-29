using ADotNet.Clients;
using ADotNet.Models.Pipelines.GithubPipelines.DotNets;
using ADotNet.Models.Pipelines.GithubPipelines.DotNets.Tasks;
using ADotNet.Models.Pipelines.GithubPipelines.DotNets.Tasks.SetupDotNetTaskV1s;

var aDotNetClient = new ADotNetClient();

var githubPipeline = new GithubPipeline
{
    Name = "ToDoApp Build Pipeline",

    OnEvents = new Events
    {
        PullRequest = new PullRequestEvent
        {
            Branches = new string[] { "main" }
        },
        Push = new PushEvent
        {
            Branches = new string[] { "main" }
        }
    },

    Jobs = new Dictionary<string, Job>
    {
        {
            "build",
            new Job
            {
                RunsOn = BuildMachines.Windows2022,

                Steps = new List<GithubTask>
                {
                    new CheckoutTaskV2
                    {
                        Name = "Checkout code"
                    },

                    new SetupDotNetTaskV1
                    {
                        Name = "Setup .NET SDK",
                        TargetDotNetVersion = new TargetDotNetVersion
                        {
                            DotNetVersion = "8.0.x"
                        }
                    },

                    new RestoreTask
                    {
                        Name = "Restore NuGet Packages"
                    },

                    new DotNetBuildTask
                    {
                        Name = "Build Solution"
                    },

                    new TestTask
                    {
                        Name = "Run Tests"
                    }
                }
            }
        }
    }
};

string buildScriptPath = "../../../../.github/workflows/dotnet.yml";
string directoryPath = Path.GetDirectoryName(buildScriptPath)!;

if (!Directory.Exists(directoryPath))
{
    Directory.CreateDirectory(directoryPath!);
}

aDotNetClient.SerializeAndWriteToFile(githubPipeline, path: buildScriptPath);
