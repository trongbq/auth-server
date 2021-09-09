const userInfo = (req, res) => {
  const a = {
    username: 'Trong',
    email: 'trong.buiquoc@gmail.co',
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(a));
};

export default userInfo;
