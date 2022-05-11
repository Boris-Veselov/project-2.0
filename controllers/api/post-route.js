const router = require('express').Router();
const {Post, User, Comment} = require ('../../models');
const sequelize = require('../../config/connection');
const auth = require('../../utils/auth')

router.post('/', (req, res)=> {
    if (req.session) {
        Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        })
        
        .then(dbPostData => res.json(dbPostData))

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
})

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment-entry', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })

    .then(dbPostData => res.json(dbPostData))

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
    Post.findOne ({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })

    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id '});
            return;
        }
        res.json(dbPostData);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', auth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )

    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id '});
            return;
        }
        res.json(dbPostData);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.findOne ({
        where: { id: req.params.id },
        include: [Comment]
    })

    .then(post => {
        post.comments.forEach(comment => {
            comment.destroy();
        })
        post.destroy();
        res.end();
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;