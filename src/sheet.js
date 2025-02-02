const SHEET = {
  task: {
    name: 'task',
    row: {
      data: 2,
    },
    column: {
      status: 46,
      exportId: 47,
      folderUrl: 48,
      id: 1,
      deliveryFileName: 17,
    },
  },
};

function getTaskList(){
  return Shomin.getSheetData(SHEET.task).map((row, index) => new Task(row, index));
}
