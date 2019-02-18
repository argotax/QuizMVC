module.exports = {

  friendList: async function (sequelize, models, Op, session_user_id) {

    var compteur = 0;
    var friends = [];
    var friends_id = [];

    new Promise(function(resolve, reject) {

      setTimeout(() => resolve(

        models.broquiz_friend.findAll({
          attributes: ['friend_id', 'friend_p1', 'friend_status'],
          where:{ friend_p2: session_user_id }
        }).then(
          user => {
            user.forEach(function(element) {
              friends.push([element.friend_id, element.friend_p1, element.friend_status]);
            });
            return friends;
          }
        )

      ), 1000); // (*)

    }).then(function(result) { // (**)

      return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(
          models.broquiz_friend.findAll({
            attributes: ['friend_id', 'friend_p2', 'friend_status'],
            where:{ friend_p1: session_user_id, friend_status: 5}
          }).then(
            friend => {
              friend.forEach(function(element) {
                friends.push([element.friend_id, element.friend_p2, element.friend_status]);
              });
              friends.forEach(function(element){
                friends_id.push(element[1]);
              });
              return friends;
            }
          )
        ), 1000);
      });

    }).then(function(result) {

      return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(
          models.broquiz_user.findAll({
            attributes: ['user_id', 'user_login'],
            where:{user_id:{[Op.in]: friends_id}},
            order: sequelize.fn('FIELD', sequelize.col('user_id'), friends_id)
          }).then(
            login => {
              login.forEach(function(element) {
                friends[compteur].push(element.user_login);
                compteur += 1;
              });
              return friends;
            }
          )
        ), 1000);
      });

    }).then(function(result){
      return result;
    });

  }

};
