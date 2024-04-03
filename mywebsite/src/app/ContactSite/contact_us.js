import React from 'react';
import {Link }from 'react-router-dom';
import {Button} from'antd';
import { RedoOutlined } from '@ant-design/icons';

function ContactUs() {
    return(
        <>
            <div>
                <center>
                    <h1>Our aim</h1>
                    <p>Our aim is to build a playable website that keeps us looking forward to life at all times.</p>
                </center>

                <center>
                    <h1>Our team</h1>
                    <p>Our team is a group of young people who are passionate about programming and games.</p>
                </center>

                <center>
                    <h1>Possible technology stacks</h1>
                    <p>React, Ant Design, Django, MySQL, Redis, Docker, Kubernetes, etc.</p>
                </center>

                <center>
                    <h1>Contact Us</h1>
                    <p>If you have any suggestions or ideas, just <strong>CONTACT US</strong> or submit your pull request!</p>
                    <br/>
                    <p>Email :
                        <a href='mailto:zouyt22@mails.tsinghua.edu.cn'> zouyt22@mails.tsinghua.edu.cn</a>
                    </p>
                    <br/>
                    <p>GitHub :
                        <a href='https://github.com/zou-y-t/zou-y-t.github.io'> zou-y-t.github.com</a>
                    </p>
                </center>
            </div>
        </>
    );
}

export default ContactUs;