const c = {

    isBiggerThanOne(array, compareFunction) {

        if(compareFunction(array)) {

            return true;

        } else {

            return false;
        }
    }

    ,compareFunction(array) {

        if (array.length > 0) {

            return true;

        } else {
            
            return false;
        }
    }
}

module.exports = c;

