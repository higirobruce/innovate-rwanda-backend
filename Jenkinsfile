pipeline {
  agent any
  tools {nodejs "NODEJS" }
  stages {
    stage('Cloning Git') {
      steps {
        git url: 'https://github.com/techclick-rw/innovaterwanda-backend.git',
            credentialsId: 'Username with Password'
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
