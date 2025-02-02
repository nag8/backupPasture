const token = PropertiesService.getScriptProperties().getProperty('token');


function createDownloadJob(){
  getTaskList()
    .filter(task => task.isStatus1())
    .slice(0, 100)
    .forEach(task => {
    task.createDownloadJob(token);
  });

}

function download(){
  getTaskList()
    .filter(task => task.isStatus2())
    .slice(0, 100)
    .forEach(task => {
    task.download(token);
  });
}
