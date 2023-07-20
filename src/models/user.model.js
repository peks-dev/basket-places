class UserModel {
  constructor(id, apodo, avatar_url, website, bio, location) {
    this.id = id;
    this.avatar_url = avatar_url;
    this.apodo = apodo;
    this.website = website;
    this.bio = bio;
    this.location = location;
  }
}

export default UserModel;
