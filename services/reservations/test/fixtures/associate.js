module.exports = async function (models) {
  const specialReservation = await models.reservation.findOne({
    where: {
      notes: 'SPECIAL',
    },
  });

  const specialDevice = await models.device.findOne({
    where: {
      name: 'SPECIAL',
    },
  });

  await specialReservation.addDevice(specialDevice.id, { through: { quantity: 1 }});
};
