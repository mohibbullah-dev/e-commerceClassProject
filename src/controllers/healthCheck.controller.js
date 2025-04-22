const healthCheck = async (req, res) => {
  try {
    await res.send('this is healthcheck route testing');
  } catch (error) {}
};

export { healthCheck };
