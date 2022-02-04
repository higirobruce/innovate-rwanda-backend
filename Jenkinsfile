pipeline {
  agent any
  tools {nodejs "NODEJS" }
  stages {
    stage('Build') {
       steps {
         sh 'npm install'
       }
    }
    stage('Test') {
      steps {
        sh 'npm run'
      }
    }
  }
}
