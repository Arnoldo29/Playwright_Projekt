pipeline
{
    agent any

    stages
    {
        stage('Build')
        {
            steps
            {
                git 'https://github.com/Arnoldo29/Playwright_Projekt.git'
                sh "mvn -Dmaven.test.failure.ignore=true clean package"
            }
            post
            {
                success
                {
                    junit '**/target/surefire-reports/*.xml'
                    archiveArtifacts '**/target/*.jar'
                }
            }
        }

        stage("Deploy to QA"){
            steps{
                echo("Deploying to QA")
            }
        }

        stage("Regression Automation Test"){
            steps{
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE'){

                }

            }
        }

        stage('Pubish Extent Report'){
            steps{
                PubishHTML([allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'build',
                reportFiles: 'TestExecutionReport.html',
                reportName: 'HTML Extent Report',
                reportTitles: ''])
            }
        }
    }

}