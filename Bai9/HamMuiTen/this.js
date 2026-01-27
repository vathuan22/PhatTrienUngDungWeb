function Person() {

    this.age = 0;

    setInterval(() => {

        this.age++; // 'this' tham chiếu đến đối tượng Person

        console.log(this.age);

    }, 1000);

}

 

const p = new Person();