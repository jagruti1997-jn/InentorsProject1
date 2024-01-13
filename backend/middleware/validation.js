const {body,validators, validationResult}=require('express-validator')

const workersValidationRules=()=>{
return[
    body('Name').notEmpty().isString().withMessage('Name is required'),
    body('date').notEmpty().withMessage('date is required'),
   
]
};
const loginValidationRules=()=>{
    return[
    body("email").isEmail(),
    body("password").isLength({
        min:6,
        max:16
    }).withMessage('password should have min 6 and max 16 char')
]
}

const categoryValidationRules=()=>{
    return[
    body('Name').notEmpty().withMessage('Name is required')
]}

const userValidationRules=()=>{
    return[
    body('FirstName').notEmpty().withMessage('Name is required'),
    body('Email').notEmpty().withMessage('Email is required'),
    body("Password").isLength({
        min:6,
        max:16
    }).withMessage("password should be min 6 to max 16 char"),
    body('Contact').notEmpty().withMessage('Contact is required'),
    body('Role').notEmpty().withMessage('Role is required')
  
]}

const siteValidationRules=()=>{
    return[
    body('Name').notEmpty().withMessage('Name is required'),
  ]
}

const vendorValidationRules=()=>{
    return[
    body('Name').notEmpty().withMessage('Name is required'),
  
]}
const requestValidationRules=()=>{
    return[
    body('ItemQuantity').notEmpty().isNumeric().withMessage('ItemQuantity is required'),
    body('ItemName').notEmpty().withMessage('ItemName is required'),
   body('CategoryID').notEmpty().withMessage('CategoryID is required'),
    body('SiteID').notEmpty().withMessage('SiteID is required'),
    
    
]}
const fileValidationRules=()=>{
return[
    
    body('vendorName').notEmpty().withMessage('venderName is required')
]
}

const validate=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    return res.status(422).json({errors:errors.array()})
}


module.exports={
    workersValidationRules,
    userValidationRules,
    loginValidationRules,
    categoryValidationRules,
    siteValidationRules,
    vendorValidationRules,
    requestValidationRules,
    fileValidationRules,
    validate
}