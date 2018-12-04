// 例子

// async function asyncTaskWithCb(cb) {
//   let err, user, savedTask, notification;

//   [ err, user ] = await to(UserModel.findById(1));
//   if(!user) return cb('No user found');

//   [ err, savedTask ] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
//   if(err) return cb('Error occurred while saving task');

//  if(user.notificationsEnabled) {
//     [ err ] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
//     if(err) return cb('Error while sending notification');
//  }

//  if(savedTask.assignedUser.id !== user.id) {
//     [ err, notification ] = await to(NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you'));
//     if(err) return cb('Error while sending notification');
//  }

//  cb(null, savedTask);
// }

// async function asyncFunctionWithThrow() {
// const [err, user] = await to(UserModel.findById(1));
// if (!user) throw new Error('User not found');

// }

export default to = function (promise) {
  return promise.then(data => {
     return [ null, data ]
  })
  .catch(err => [ err ])
}