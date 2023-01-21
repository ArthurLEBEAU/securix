import 'dotenv/config'
import { HttpResponse } from '../helpers/helper.js';
import { User } from '../models/index.js'
import CryptoJS from 'crypto-js'
import passport from 'passport';

export default class AuthController {
    constructor() {}

    /**
     * return the admin login page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async loginView(req, res) {
        if (req.isAuthenticated()) return res.redirect('/admin');
        res.status(HttpResponse.OK);
        return res.render('admin/login.njk');
    }

    /**
     * loin a user
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async login(req, res) {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            try {
                passport.authenticate("local")(
                    req, res,
                    function() {
                        req.session.save(function(err) {
                            if (err) {
                                res.send({ error: "une erreur c'est produite!" });
                            }
                            res.status(HttpResponse.OK);
                            res.send({ success: "vous etes connecter !" });
                        });
                    });
            } catch (error) {
                res.status(HttpResponse.UNAUTHORIZED);
                return res.send({ error: "vous n'etes pas autoriser" })
            }
        } else {
            res.status(HttpResponse.NOT_FOUND);
            return res.send({ error: "nom d'utilisateur ou mot de passe incorect" })
        }
    }

    /**
     * register a new user
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async register(req, res, next) {
        try {
            const data = {
                username: req.body.username,
                password: req.body.password,
            }

            User.register(new User({ username: data.username }),
                data.password,
                function(err, user) {
                    if (err) {
                        res.send({ error: "une erreur c'est produite !" });
                    }
                    passport.authenticate("local")(
                        req, res,
                        function() {
                            req.session.save(function(err) {
                                if (err) {
                                    res.send({ error: err });
                                }
                                res.status(HttpResponse.CREATED);
                                res.send({ success: "vous pouvez vous connecter !" });
                            });
                        });
                });

        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            return res.send({ error: "ue erreur c'est produite" })
        }
    }

    /**
     * update a user
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async account(req, res, next) {
        try {
            const data = {
                username: req.body.username,
                oldpassword: req.body.password,
                newpassword: req.body.confirmPwd,
            }

            const user = await User.findById(req.user._id)
            if (user) {
                const r = await user.changePassword(data.oldpassword, data.newpassword)
                if (r) {
                    if (data.username != null || data.username != "") {
                        await User.updateOne({ _id: req.user._id }, {
                            $set: {
                                username: data.username,
                            }
                        })
                    }
                    res.status(HttpResponse.OK)
                    return res.send({ message: "bon travail votre compte à été modifier!" })
                }
                res.status(HttpResponse.BAD_REQUEST)
                return res.send({ error: "verifier vos mots de passe!!" })
            }
            res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            return res.send({ error: "une erreur c'est produite!!" })

        } catch (error) {
            res.status(HttpResponse.INTERNAL_SERVER_ERROR)
            return res.send({ error: "une erreur c'est produite!!" })
        }
    }

    /**
     * return the admin register page
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async registerView(req, res) {
        res.status(HttpResponse.OK);
        return res.render('admin/register.njk');
    }

    /**
     * logout the user
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @returns Express.res
     */
    async logout(req, res) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.send({ success: 'deconexion reussit!' });
        });
    }


    /**
     * 
     * @param {String} pwd 
     * @returns {String}
     */
    cryptMdp(pwd) {
        let data = btoa(unescape(encodeURIComponent(pwd + process.env.SALT)));
        return CryptoJS.AES.encrypt(data, process.env.SECRET_KEY).toString();
    }

    /**
     * 
     * @param {String} cpwd 
     * @param {String} ucpwd 
     * @returns {Boolean}
     */
    compare(cpwd, ucpwd) {
        const pwd = CryptoJS.AES.decrypt(cpwd, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)
        try {
            let data = decodeURIComponent(escape(atob(pwd)));
            data = data.replace(process.env.SALT, '');
            return data == ucpwd;
        } catch (error) {
            return false
        }
    }


}