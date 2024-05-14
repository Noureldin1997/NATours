const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

function checkID(id, res) {
  if (id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'File Not Found' });
  }
}

//route handlers

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    nResults: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  checkID(req.params.id, res);

  const tour = tours.find((el) => el.id === req.params.id * 1);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'file not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
    // nResults: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.patchTour = (req, res) => {
  checkID(req.params.id, res);
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour here',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'file not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.postNewTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
