module.exports = function (models) {
  return new Promise(async (resolve, reject) => {
    return models.device.destroy({ where: {} })
      .then(() => {
        resolve([
          {
            model: 'device',
            data: {
              name: 'Mixer 1 Tascam',
              label: 'MIXER 1 TASCAM',
              description: null,
              notes: null,
              type: 'Recorders',
              meta: null,
              quantity: 1,
              disabled: false,
              barcode: 'AAAA',
              organizationId: 1,
            },
          },
          {
            model: 'device',
            data: {
              name: 'Zoom H4',
              label: 'Zoom 2',
              description: null,
              notes: 'Disabled Fall 2016',
              type: 'Recorders',
              meta: null,
              quantity: 1,
              disabled: true,
              barcode: 'BBBB',
              organizationId: 1,
            },
          },
          {
            model: 'device',
            data: {
              name: 'Zoom H6',
              label: 'Zoom 3s',
              description: null,
              notes: 'Mercury Device',
              type: 'Recorders',
              meta: null,
              quantity: 1,
              disabled: false,
              barcode: 'CCCC',
              organizationId: 2,
            },
          },
          {
            model: 'device',
            data: {
              name: 'SPECIAL',
              label: 'Special Device',
              description: null,
              notes: 'Device',
              type: 'Camera',
              specialApproval: 'technology-director',
              meta: null,
              quantity: 1,
              disabled: false,
              barcode: 'DDDD',
              organizationId: 1,
            },
          },
        ]);
      });
  });
};
