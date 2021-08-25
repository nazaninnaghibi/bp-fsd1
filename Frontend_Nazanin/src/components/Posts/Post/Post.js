import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <Typography variant="p">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      <div className={classes.details}>
        <Typography variant="p">Full name: {post.firstName} {post.lastName}</Typography>
      </div>

      {/* {(user?.result?._id == post?.creator)&&( */}
      <div className={classes.overlay2}>
        <Button style={{ color: 'black' }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default" />Edit
        </Button>
      </div>
      {/* )} */}
      <CardContent>
        <Typography className={classes.title} variant="p" gutterBottom>Phone: {post.phone}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>

        {/* {(user?.result?._id == post?.creator)&&( */}
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
        {/* )} */}
      </CardActions>

    </Card>
  );
};

export default Post;

