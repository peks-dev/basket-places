export const createUserAdapter = (user) => ({
  id: user.data.id,
  name: user.data.name,
});
