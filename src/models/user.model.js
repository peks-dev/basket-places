class UserModel {
  constructor(
    id = null,
    apodo = null,
    avatar_url = null,
    website = null,
    bio = null,
    location = null
  ) {
    this.id = id;
    this.avatar_url = avatar_url;
    this.apodo = apodo;
    this.website = website;
    this.bio = bio;
    this.location = location;
  }
}

export default UserModel;
