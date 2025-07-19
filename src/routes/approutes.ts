import express from 'express';
import { CreateUser, GetUsers, UpdateUser, DeleteUser,ReloadUser ,GetProfile, Toggle, Visibility, ForgetPassword, ResetPassword} from '../controller/user';
import {Post,GetPost,UpdatePost,DeletePost, GetPost2} from '../controller/post';
import {Comment,GetComment,UpdateComment,DeleteComment} from '../controller/comment';
import {Like,GetLike,UpdateLike,DeleteLike} from '../controller/like';
import { Login } from '../controller/login';
import { Postcount } from '../controllerss/getpost/count';
import multer from 'multer'
import { EditProfile } from '../controller/editprofile';
import {CommentBox} from '../controller/commentbox';
import{Follow,GetFollow,UpdateFollow,DeleteFollow, CountFollow, CountFollowing, checkFollow} from '../controller/follow';
import { Search } from '../controller/search';

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })



// const upload = multer({ dest: 'uploads/' });

router.post('/user',upload.single('image'),CreateUser)
router.get('/users',GetUsers)
router.get('/user/:id',GetProfile)
router.patch('/user/:id',UpdateUser)
router.delete('/user/:id',DeleteUser)
router.get('/reloaduser',ReloadUser)
router.post('/fpassword/',ForgetPassword)
router.post('/reset-password/',ResetPassword)

router.post('/post', upload.single('image'), Post)
router.get('/posts/',GetPost)
router.get('/posts/:id',GetPost2)
router.patch('/post/:id',UpdatePost)
router.delete('/post/:id',DeletePost)
router.get('/getpost/:id',Postcount)

router.post('/comment/:id',Comment)
router.get('/comments',GetComment)
router.patch('/comment/:id',UpdateComment)
router.delete('/comment/:id',DeleteComment)
 
router.post('/like',Like)
router.get('/likes',GetLike)
router.patch('/like/:id',UpdateLike)  
router.delete('/like/:id',DeleteLike)

router.post('/login',Login)
router.post('/toggle',Toggle)
router.get('/visibility/:id',Visibility)

router.patch('/editprofile/:id', upload.single('image'),EditProfile)

router.get('/commentbox/:id',CommentBox)

router.post('/follow',Follow)
router.get('/follows',GetFollow)
router.patch('/follow/:id',UpdateFollow)
router.delete('/follow/:postUserId/:userId',DeleteFollow)
router.get('/follow/:id',CountFollow)
router.get('/follow/check/:postUserId/:userId',checkFollow)
router.get('/following/:id',CountFollowing)

router.post('/search',Search)

export {router}