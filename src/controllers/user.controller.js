module.exports = {
  Logout: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.status(204).json();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204).json();
  },
};
