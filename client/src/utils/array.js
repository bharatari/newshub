import _ from 'lodash';

export default {
  updateById(collection, id, object) {
    // Deleting and then re-adding object so that the array
    // causes a rerender in React.
    const index = _.findIndex(collection, (item) => {
      return item.id === id;
    });
    collection = this.deleteFromArrayById(collection, id);

    const updatedCollection = [
      ...collection,
    ];
    // Use splice with index to maintain order of the collection
    updatedCollection.splice(index, 0, object);
    
    return updatedCollection;
  },
  deleteFromArrayById(array, id) {
    const index = _.findIndex(array, (item) => {
      return item.id === id;
    });

    array.splice(index, 1);

    return array;
  },
  isObjectArray(array) {
    if (array) {
      if (array[0]) {
        if (_.isPlainObject(array[0])) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
