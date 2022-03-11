pipeline {
  agent {label 'Slave-back'}
  tools {nodejs "NODEJS" }
  stages {
    stage('Build') {
       steps {
         sh 'npm install -g'
       }
    }
    stage('Test') {
      steps {
        sh 'npm run'
      }
    }
    stage('Deploy') {
      steps {
        sh 'yarn run env'
        sh 'yarn run env'
        sh 'pm2 start npm --name "app" -- start'
        sh 'pm2 save'
        sh 'yarn run'
      }
    }
  }
}
