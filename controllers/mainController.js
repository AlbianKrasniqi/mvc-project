exports.index = (req, res) => {
  console.log(req.session);
  res.render('site/index');
};

exports.about = (req, res) => {
  res.render('site/about');
};

exports.contact = (req, res) => {
  res.render('site/contact');
};
