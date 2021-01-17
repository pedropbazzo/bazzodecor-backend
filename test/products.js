//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Products', () => {
  // Consts
  const id = '3',
    numProducts = 5,
    successCode = 200,
    product = {
      name: 'hello',
      price: '1170',
      image: 'https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160',
      "colors": [
        "#ff0000",
        "#00ff00",
        "#0000ff"
        ],
        company: 'Marcos',
        description: 'BLABABBABABABAABABBABABBABBBA',
        category: 'office',
        shipping: true
    },
    testName = 'Cannon EOS 80D DSLR Camera',
    testPrice = { title: 'hello', price: '778', image: 'https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160'};

  /*
  * Test for /GET
  */
  describe('/GET product', () => {
    res.setHeader('Acess-Control-Allow-Origin', 'https://bazzodecor.pedropbazzo.vercel.app/')
    res.send('Lista')
    it('it should GET all the products', done => {
      chai.request(server)
        .get('/products')
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(numProducts);
          done();
        });
    });
  });
  /*
  * Test for /POST
  */
  describe('/POST product', () => {
    it('it should POST a product ', done => {
      chai.request(server)
        .post('/products')
        .send(product)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('price');
          res.body.should.have.property('image');
          res.body.should.have.property('id');
          res.body.should.have.property('colors');
          res.body.should.have.property('company');
          res.body.should.have.property('description');
          res.body.should.have.property('category');
          res.body.should.have.property('shipping');
          done();
        });
    });
  });
  /*
  * Test for /GET:id
  */
  describe('/GET/:id product', () => {
    it('it should GET a book by the given id', done => {
      chai.request(server)
        .get(`/products/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('name').eql(testName);
          res.body.should.have.property('price');
          res.body.should.have.property('image');
          res.body.should.have.property('colors').eql(colors);
          res.body.should.have.property('company').eql(testCompany);
          res.body.should.have.property('description').eql(testDescription);
          res.body.should.have.property('category').eql(testCategory);
          res.body.should.have.property('shipping').eql(testShipping);
          done();
        });
    });
  });
  /*
  * Test for /PUT:id
  */
  describe('/PUT/:id product', () => {
    it('it should UPDATE a product given the id', done => {
      chai.request(server)
        .put(`/products/${id}`)
        .send(testPrice)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('name').eql(testName);
          res.body.should.have.property('price').eql(testPrice.price);
          res.body.should.have.property('image').eql(testImage);
          res.body.should.have.property('colors').eql(colors);
          res.body.should.have.property('company').eql(testCompany);
          res.body.should.have.property('description').eql(testDescription);
          res.body.should.have.property('category').eql(testCategory);
          res.body.should.have.property('shipping').eql(testShipping);
          done();
        });
    });
  });
  /*
  * Test for /DELETE:id
  */
  describe('/DELETE/:id product', () => {
    it('it should DELETE a product given the id', done => {
      chai.request(server)
        .delete(`/products/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Product ${id} removed`);
          done();
        });
    });
  });
});
