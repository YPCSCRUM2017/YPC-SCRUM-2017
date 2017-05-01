var mongoose = require('mongoose');
var ContentSchema = new mongoose.Schema({
  type: String,
  content: {}
  // first_name: String,
  // last_name: String,
  // email: String
});
// Remember we can treat mongoose.model() as a getter function or a setter function
// mongoose.model('Content') will be used to retrieve content scema
// mongoose.model('Content', ContentSchema) will be used to set the contentSchema to the Content key
// we will retrieve this schema in our contentController later
mongoose.model('Content', ContentSchema);

// Custom Validations for content schema
// ContentSchema.path('first_name').required(true, 'First Name cannot be blank');
// ContentSchema.path('last_name').required(true, 'Last Name cannot be blank');
// ContentSchema.path('email').required(true, 'Email cannot be blank');
ContentSchema.path('type').required(true, 'Cannot leave content type blank')
