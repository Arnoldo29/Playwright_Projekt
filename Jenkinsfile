pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Name der Node.js-Installation in Jenkins (muss konfiguriert sein)
    }

    environment {
        API_URL = 'http://127.0.0.1:8001'
        TESTDATA_URL = 'http://127.0.0.1:8501'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Arnoldo29/Playwright_Projekt.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Installiere Node.js-Abhängigkeiten
                    bat 'npm ci'
                }
            }
        }

        stage('Start Docker Containers') {
            steps {
                script {
                    // API-Server starten
                    bat 'docker run -d -p 8001:8001 --name api-server api-server'

                    // Testdatengenerator starten
                    bat 'docker run -d -p 8501:8501 --name testdatengenerator testdatengenerator-image'

                    // Warten, bis die API verfügbar ist
                    bat '''
                    for /L %%i in (1,1,10) do (
                        curl -s http://127.0.0.1:8001 && exit /b 0 || timeout /t 5 >nul
                    )
                    '''

                    // Warten, bis der Testdatengenerator verfügbar ist
                    bat '''
                    for /L %%i in (1,1,10) do (
                        curl -s http://127.0.0.1:8501 && exit /b 0 || timeout /t 5 >nul
                    )
                    '''
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    // Playwright-Tests ausführen
                    bat 'npx playwright test --output test-results'
                }
            }
            post {
                always {
                    // Testergebnisse hochladen
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    // Allure-Bericht generieren
                    bat 'npx allure generate allure-results -o allure-report --clean'
                }
            }
            post {
                always {
                    // Allure-Bericht hochladen
                    publishHTML([allowMissing: false,
                                 alwaysLinkToLastBuild: true,
                                 keepAll: true,
                                 reportDir: 'allure-report',
                                 reportFiles: 'index.html',
                                 reportName: 'Allure Report'])
                }
            }
        }

        stage('Stop Docker Containers') {
            steps {
                script {
                    // Docker-Container stoppen und entfernen
                    bat 'docker stop api-server && docker rm api-server'
                    bat 'docker stop testdatengenerator && docker rm testdatengenerator'
                }
            }
        }
    }

    post {
        always {
            // Cleanup: Docker-Container entfernen, falls sie noch laufen
            script {
                bat 'docker rm -f api-server || exit 0'
                bat 'docker rm -f testdatengenerator || exit 0'
            }
        }
        success {
            echo 'Pipeline erfolgreich abgeschlossen!'
        }
        failure {
            echo 'Pipeline fehlgeschlagen. Bitte Logs überprüfen.'
        }
    }
}