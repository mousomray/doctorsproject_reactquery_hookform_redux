import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            {/* <!-- Footer Start --> */}
            <div class="container-fluid bg-dark text-light mt-5 py-5">
                <div class="container py-5">
                    <div class="row g-5">
                        <div class="col-lg-3 col-md-6">
                            <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">Get In Touch</h4>
                            <p class="mb-4">We're here to help you take control of your health journey. Whether you have questions, concerns, or simply want to schedule an appointment, we're just a message away.</p>
                            <p class="mb-2"><i class="fa fa-map-marker-alt text-primary me-3"></i>7003 Street, Kolkata, India</p>
                            <p class="mb-2"><i class="fa fa-envelope text-primary me-3"></i>mousomray02@gmail.com</p>
                            <p class="mb-0"><i class="fa fa-phone-alt text-primary me-3"></i>+033-26643827</p>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">Quick Links</h4>
                            <div class="d-flex flex-column justify-content-start">
                                <Link class="text-light mb-2" to="/"><i class="fa fa-angle-right me-2"></i>Home</Link>
                                <Link class="text-light mb-2" to="/about"><i class="fa fa-angle-right me-2"></i>About Us</Link>
                                <Link class="text-light mb-2" to="/services"><i class="fa fa-angle-right me-2"></i>Our Services</Link>
                                <a class="text-light mb-2" href="#"><i class="fa fa-angle-right me-2"></i>Meet The Team</a>
                                <Link class="text-light mb-2" to="/blog"><i class="fa fa-angle-right me-2"></i>Blog</Link>
                                <Link class="text-light" to="/contact"><i class="fa fa-angle-right me-2"></i>Contact Us</Link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">Popular Links</h4>
                            <div class="d-flex flex-column justify-content-start">
                                <Link class="text-light mb-2" to="/"><i class="fa fa-angle-right me-2"></i>Home</Link>
                                <Link class="text-light mb-2" to="/about"><i class="fa fa-angle-right me-2"></i>About Us</Link>
                                <Link class="text-light mb-2" to="/services"><i class="fa fa-angle-right me-2"></i>Our Services</Link>
                                <a class="text-light mb-2" href="#"><i class="fa fa-angle-right me-2"></i>Meet The Team</a>
                                <Link class="text-light mb-2" to="/blog"><i class="fa fa-angle-right me-2"></i>Blog</Link>
                                <Link class="text-light" to="/contact"><i class="fa fa-angle-right me-2"></i>Contact Us</Link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">Newsletter</h4>
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control p-3 border-0" placeholder="Your Email Address"/>
                                        <button class="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <h6 class="text-primary text-uppercase mt-4 mb-3">Follow Us</h6>
                            <div class="d-flex">
                                <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" href="#"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                                <a class="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid bg-dark text-light border-top border-secondary py-4">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-md-6 text-center text-md-start">
                            <p class="mb-md-0">&copy; <a class="text-primary" href="#">Doctor 24x7</a>. All Rights Reserved.</p>
                        </div>
                        <div class="col-md-6 text-center text-md-end">
                            <p class="mb-0">Created by <a class="text-primary" href="https://htmlcodex.com">Mousom Ray</a></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}
        </>
    )
}

export default Footer
