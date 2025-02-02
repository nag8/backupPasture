class Task{
  constructor(row, index){
    this.rowIndex = index + SHEET.task.row.data;
    this.id = row[SHEET.task.column.id - 1];
    this.exportId = row[SHEET.task.column.exportId - 1];
    this.folderUrl = row[SHEET.task.column.folderUrl - 1];
    this.deliveryFileName = row[SHEET.task.column.deliveryFileName - 1];
    this.status = row[SHEET.task.column.status - 1];
  }

  isStatus1(){
    return this.status === '未';
  }

  isStatus2(){
    return this.status === 'phase1';
  }

  createDownloadJob(token){
    

    const options = {
      headers : {
        'Authorization': `Bearer ${token}`,
      },
      'method' : 'post',
      'contentType' : 'application/json',
      'payload' : JSON.stringify({
        'task_ids': [this.id],
      }),
    };

    let res = UrlFetchApp.fetch('https://api.pasture.work/v1.1/company/tasks/file_attachment_batch_exports', options);

    res = JSON.parse(res);
    Shomin.setList(
      SHEET.task,
      this.rowIndex,
      SHEET.task.column.status,
      [[
        'phase1',
        res.file_attachment_batch_export_id
      ]]
    );
  }

  download(token) {
  
    const options = {
      headers : {
        'Authorization': `Bearer ${token}`,
      },
      method : 'get',
    };
  
    const file = UrlFetchApp.fetch(`https://api.pasture.work/v1.1/company/tasks/file_attachment_batch_exports/${this.exportId}/download`, options);
    const folder = DriveApp.getFolderById('xxxxxxxx').createFolder(this.id);
    const url = folder.createFile(file).getUrl();

    Shomin.setList(
      SHEET.task,
      this.rowIndex,
      SHEET.task.column.status,
      [[
        '完了',
        this.exportId,
        url
      ]]
    );
    
  }
}