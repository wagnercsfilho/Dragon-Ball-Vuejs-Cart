import firebase, { db } from '../firebase';

const snapshotToArray = (querySnapshot) => {
  const data = [];
  querySnapshot.forEach((doc) => data.push(snapshotToObject(doc)));
  return data;
}

const snapshotToObject = (doc) => {
  return {
    id: doc.id,
    ...doc.data()
  }
}

const getCurrentUser = () => firebase.auth().currentUser;

export default {
  async signUp(name, email, password) {
    let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const a = await user.updateProfile({ displayName: name });
    return { ...user.toJSON(), displayName: name };
  },

  async signIn(email, password) {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user.toJSON();
  },

  async signOut(email, password) {
    await firebase.auth().signOut();
    return true;
  },

  async getProducts() {
    const querySnapshot = await db.collection("products").get();
    return snapshotToArray(querySnapshot);
  },

  async getAddresses() {
    const currentUser = getCurrentUser();
    const querySnapshot = await db.collection("addresses").where('user', '==', currentUser.uid).get();
    return snapshotToArray(querySnapshot);
  },

  async getAddressById(addressId) {
    const currentUser = getCurrentUser();
    const querySnapshot = await db.collection("addresses").doc(addressId).get();
    return snapshotToObject(querySnapshot);
  },

  async createAddress(data) {
    const currentUser = getCurrentUser();
    const querySnapshot = await db.collection("addresses").add({ ...data, user: currentUser.uid });
    return this.getAddressById(querySnapshot.id);
  },

  async updateAddress(data) {
    const ref = await db.collection("addresses").doc(data.id);
    await ref.update(data);
    return data;
  },

  async removeAddress(data) {
    const ref = await db.collection("addresses").doc(data.id);
    await ref.delete();
    return data;
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
