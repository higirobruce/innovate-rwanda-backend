pipeline {
  agent any
  tools {nodejs "NODEJS" }
  stages {
    stage('Cloning Git') {
      steps {
        git url: 'https://github.com/techclick-rw/innovaterwanda-backend.git',
            credentialsId: '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'
      }
    }
    stage('Build') {
       steps {
         sh 'npm install'
       }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
