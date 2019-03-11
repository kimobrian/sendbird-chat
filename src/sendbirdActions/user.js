import SendBird from "sendbird";

const APP_ID = "5B3A0A4D-7175-4C23-9D99-1366F816E953";

export const sbConnect = (userId, nickname) => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({appId: APP_ID});
    sb.connect(userId, (user, error) => {
      if (error) {
        reject("SendBird Login Failed.");
      } else {
        sb.updateCurrentUserInfo(
          nickname,
          "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj9vYbVyfPgAhXozIUKHb4DCHEQjRx6BAgBEAU&url=http%3A%2F%2Fchittagongit.com%2Ficon%2Favatar-icon-images-8.html&psig=AOvVaw3xoRYpQeat7VxJ5syoTIHU&ust=1552169913754956",
          (user, error) => {
            if (error) {
              reject("Update User Failed.");
            } else {
              resolve(user);
            }
          }
        );
      }
    });
  });
};
