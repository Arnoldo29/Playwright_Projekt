pipeline {
    agent any

    tools {
        maven 'Maven' // Name der Maven-Installation in Jenkins
    }

    stages {
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/Arnoldo29/Playwright_Projekt.git'
                bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
            post {
                success {
                    junit '**/target/surefire-reports/*.xml'
                    archiveArtifacts '**/target/*.jar'
                }
            }
        }

        stage("Deploy to QA") {
            steps {
                echo("Deploying to QA")
            }
        }

        stage("Regression Automation Test") {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    // Test steps here
                }
            }
        }

        stage('Publish Extent Report') {
            steps {
                publishHTML([allowMissing: false,
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