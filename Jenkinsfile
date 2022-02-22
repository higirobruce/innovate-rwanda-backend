pipeline {
  agent {label 'Slave-back'}
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
    stage('Deploy') {
      steps {
        sh 'yarn run'
      }
    }
  }
}
