import TermsLayout from '@/components/term/TermLayout'
import React from 'react'
import { terms } from '@/constants/terms'

const TermPage = () => {
    return (
        <TermsLayout>
            <div className='md:px-0 md:mx-10 px-6 relative'>
                <div className='w-full'>
                    <h1 className={`my-10 mb-[1.6rem] leading-[1.2] font-bold tracking-normal text-2xl md:text-4xl`}>Điều khoản và điều kiện</h1>
                    <p className='p_line_height mt-3'>
                        <i>Những điều khoản này (<strong>&quot;Điều khoản&quot;</strong>) đã được cập nhật vào ngày 6 tháng 6 năm 2024.</i>
                    </p>
                    <p className='p_line_height mt-3'>
                        <strong>Vui lòng xem xét kỹ lưỡng các Điều khoản này vì chúng đóng vai trò là hợp đồng có thể thực thi giữa chúng tôi và chứa thông tin quan trọng về quyền, biện pháp khắc phục và nghĩa vụ của bạn.</strong>
                    </p>
                    <p className='p_line_height mt-3'>
                        <strong>NẾU BẠN SỐNG Ở VIỆT NAM, BẰNG VIỆC ĐỒNG Ý VỚI CÁC ĐIỀU KHOẢN NÀY, BẠN ĐỒNG Ý GIẢI QUYẾT TẤT CẢ CÁC TRANH CHẤP VỚI PAWBLOOM TẠI TÒA ÁN KIỆN NHỎ HOẶC CHỈ THÔNG QUA TRỌNG TÀI CÁ NHÂN CÓ RÀNG BUỘC VÀ BẠN TỪ BỎ QUYỀN THAM GIA VÀO BẤT KỲ VỤ KIỆN TẬP THỂ NÀO VÀ TỪ BỎ QUYỀN ĐỐI VỚI QUYẾT ĐỊNH CỦA BỒI THẨM ĐOÀN,.</strong>
                    </p>
                    <div className='mt-3'>
                        <p className='p_line_height'>Sứ mệnh của Pawbloom là cải thiện cuộc sống của những bé thú cưng thông qua việc cho các bé một mái ấm mới. Chúng tôi giúp bất kỳ ai, ở bất kỳ đâu, có thể tạo và chia sẻ nội dung giáo dục (người hướng dẫn) và truy cập nội dung giáo dục về thú cưng đó để tìm hiểu. Chúng tôi coi mô hình thị trường này là cách tốt nhất để cung cấp nội dung giáo dục có giá trị cho người dùng. Chúng tôi cần các quy tắc để đảm bảo nền tảng và dịch vụ của chúng tôi an toàn cho bạn, chúng tôi và cộng đồng người yêu thú cưng của chúng tôi. Các Điều khoản này áp dụng cho tất cả các hoạt động của bạn trên trang web Pawbloom, ứng dụng di động Pawbloom, API của chúng tôi và các dịch vụ liên quan khác (
                            <strong>&quot;Dịch vụ&quot;</strong>
                            )
                        </p>
                        <p className='p_line_height mt-4'>If you post a course on the Pawbloom platform, you must also agree to Terms for Instructors. We also provide details about our processing of personal data of students and lecturers in Privacy policy of us</p>
                        <p className='p_line_height mt-4'>Our website and applications cause communications about your web and application browsing activities and application usage to be sent from you to third parties that provide services to Pawbloom. By using our Services, you agree to these communications.</p>
                        <h2 className='mt-8 mb-2 font-semibold text-xl sm:text-2xl'>Categories</h2>
                        <ul className='list-none p-0'>
                            {terms.map(term => (
                                <li className='list-disc ml-[2.5rem] text-[1.2rem] leading-loose' key={term.id}>
                                    <a className='no-underline text-[#0073e6] hover:underline' href={term.link}>{term.name}</a>
                                </li>
                            ))}
                        </ul>


                        <h2 id='section1' className='mt-8 font-semibold text-xl sm:text-2xl'>1. Tài khoản</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>You need an account for most activities on our platform. Please be sure to keep your password in a safe place, as you are responsible for all activities related to your account. If you suspect someone is using your account, please let us know by contacting Support Group ours. You must be of legal age to consent to online services in your country to use Pawbloom.</p>
                        </div>

                        <p className='p_line_height mt-3'>You need an account for most activities on our platform, including purchasing and accessing content or submitting content for posting. When establishing and maintaining an account, you must provide and continue to provide accurate and complete information, including a valid email address. You are solely responsible for your account and all activities that occur on your account, including any harm or damage (to us or anyone else) caused by someone else using your account. you without your permission. This means you need to keep your password carefully. You may not transfer your account to another person or use another person's account. If you contact us to request access to an account, we will not grant you access unless you can provide the information we need to prove you are the owner of the account. that account. In the event of a user's death, that user's account will be closed.</p>

                        <p className='p_line_height mt-3'>You may not share your account login information with anyone else. You are responsible for all activity on your account, and Pawbloom will not intervene in disputes between students or instructors sharing account login information. You must notify us immediately upon learning that someone may be using your account without your permission.</p>

                        <p className='p_line_height mt-3'>Students and instructors must be 18 years of age to create an account on Pawbloom and use the Services. If you are under 18 but over the age required to consent to use online services where you live (for example, 13 in the US or 16 in Ireland), you cannot set up an account but We encourage you to ask a parent or guardian to open an account and help you access appropriate content. If you are not old enough to consent to the use of these online services, you may not create a Pawbloom account. If we discover that you have created an account in violation of these rules, we will terminate your account.</p>


                        <h2 id='section2' className='mt-8 font-semibold text-xl sm:text-2xl'>2. Content Subscription and Lifetime Access</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>When you enroll in a course or other content, you receive a license from us to view that content through the Pawbloom Services and not use it for any other purpose. Please do not attempt to transfer or resell the content in any way. We generally grant you a lifetime access license, unless we have to disable content for legal or policy reasons or for Subscription subscriptions.</p>
                        </div>
                        <p className='p_line_height mt-3'>Under our Instructor Terms, when instructors post content on Pawbloom, they grant Pawbloom a license to license the content to students, which means we have the right to sublicense the content to students. registered member. As a student, when you enroll in a course or other content, whether free or paid, you receive a license from Pawbloom to view the content through the platform and Services. of Pawbloom and Pawbloom is the licensor. Content is licensed and not sold to you. This license does not grant you any rights to resell the content in any way (including by sharing account information with the purchaser or illegally downloading the content and sharing it on other platforms). torrent site.</p>

                        <p className='p_line_height mt-3'>In fuller legal terms, Pawbloom grants you (as a student) a limited, non-exclusive, non-transferable license to access and view the content for which you have paid all fees. required fees, solely for personal, non-commercial educational purposes through the Services, subject to these Terms and any conditions or restrictions regarding specific content or features of the Services ours. All other uses are expressly prohibited. You may not copy, redistribute, transmit, transfer, sell, broadcast, rent, share, lend, modify, adapt, edit, create derivative works, sublicense, transfer or use any content unless we expressly permit it in a written agreement signed by an authorized Pawbloom representative. This also applies to content you can access through any of our APIs.</p>

                        <p className='p_line_height mt-3'>Typically, we grant a student a lifetime access license when the student enrolls in a course or other content. However, we reserve the right to revoke any license to access and use any content at any time in the event that we decide or are obliged to disable access to the content for any reason. legal or policy reasons, for example, if a course or other content in which you are enrolled is the subject of a copyright infringement claim or if we determine that the content is infringing</p>

                        <p className='p_line_height mt-3'>
                            Instructors may not directly grant access to their content to students, and any such direct license is void and violates these Terms.</p>

                        <h2 id='section3' className='mt-8 font-semibold text-xl sm:text-2xl'>3. Payments, Offers and Refunds</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>When paying, you agree to use a valid payment method. If you&apos;re not satisfied with the content, Pawbloom offers a 30-day refund or offer on most content purchases.</p>
                        </div>
                        <p className='p_line_height mt-3'>We will occasionally run promotions and sales for our content, where certain content will be made available at a discounted price for a certain period of time. The price applicable to that content will be the price at the time you complete your purchase of the content (at checkout). Any recommended prices for specific content may differ between the time you log in to your account and the price for unregistered or unlogged in users, due to some of our promotions. I&apos;m just for new users.</p>

                        <p className='p_line_height mt-3'>You agree to pay for the content you purchase and you authorize us to charge your debit or credit card or process such charges by other payment methods (such as Boleto, SEPA, direct debit or mobile wallet). Pawbloom partners with payment service providers to offer you the most convenient payment methods in your country and to keep your payment information secure. We may update your payment method using information provided by our payment service provider.</p>

                        <p className='p_line_height mt-3'>If the content you purchased is not what you expected, within 30 days of purchasing the content, you can request a refund from Pawbloom to your account. This refund option does not apply to Subscription purchases, which are covered in Section 8.4 (Payment and Billing) below. We may, at our sole discretion, issue you a refund as a refund offer or a refund to your original payment method, subject to the capabilities of our payment service providers, the platform you purchased the content on (website, mobile app or TV) and other factors. You will not receive a refund if you submit a request after the 30-day guarantee period has expired. However, if content you previously purchased is disabled for legal or policy reasons, you are entitled to a refund after this 30-day limit. Pawbloom also reserves the right to refund students after the 30-day period in the event of suspected or confirmed account fraud.</p>

                        <p className='p_line_height mt-3'>Pawbloom or our partners may offer promotional codes and gifts to students. Some codes can be redeemed for gifts or promotional offers applicable to your Pawbloom account, which can then be used to eligible purchase content on our platform, subject to our terms and conditions. clause that acccompanies that code. Other codes can be redeemed directly for specific content. You cannot use gift and promotional offers to make purchases in our mobile or TV apps.</p>

                        <h2 id='section4' className='mt-8 font-semibold text-xl sm:text-2xl'>4. Content and behavior rules</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>You may only use Pawbloom for lawful purposes. You are responsible for all content you post on our platform. You should ensure that the reviews, questions, posts, courses and other content you upload comply with our Trust & Safety Guidelines and the law, and respect intellectual property rights. wisdom of others. We may ban your account for repeated or serious violations. Please notify us if you believe someone is violating your copyright on our platform.</p>
                        </div>
                        <p className='p_line_height mt-3'>You may not access or use the Services or create an account for illegal purposes. Your use of the Services and your conduct on our platform is subject to applicable national or local laws or regulations in your country of residence. You are solely responsible for your knowledge of and compliance with the laws and regulations that apply to you.</p>

                        <p className='p_line_height mt-3'>If you are a student, the Services allow you to ask questions of instructors about courses or other content in which you are enrolled and to post reviews of the content. For certain content, instructors may invite you to submit content as &apos;homework&apos; or an exam. Don&apos;t post or send anything that isn&apos;t yours.</p>

                        <p className='p_line_height mt-3'>If you are an instructor, you can submit content to post on the platform, and you can also contact students enrolled in your course or other content. In both cases, you must comply with the law and respect the rights of others: you may not post any courses, questions, answers, reviews or other content that violates local laws or regulations. applicable local or national law in your country of residence. You are solely responsible for any courses, content and actions you post or take through the platform and Services and their consequences. Make sure you understand all applicable copyright restrictions</p>

                        <h2 id='section5' className='mt-8 font-semibold text-xl sm:text-2xl'>5. Pawbloom&apos;s rights to the content you post</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>You maintain ownership of the content you post to our platform, including your courses. We are permitted to share your content with anyone else through any media, including promoting it through advertising on other websites.</p>
                        </div>

                        <p className='p_line_height mt-3'>When you post content, comments, questions, reviews, and when you send us ideas and suggestions for new features or improvements, you authorize Pawbloom to use and share this content with any anyone, distribute and promote such content on any platform and in any media and to modify or edit as it sees fit.</p>

                        <p className='p_line_height mt-3'>In legal terms, by submitting or posting content on or through the platforms, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, post, transmit, display and distribute your content (including your name and likeness) in any and all media or method of distribution (existing or later developed). This includes providing your content to other companies, organizations or individuals that partner with Pawbloom to syndicate, broadcast, distribute or post the content in other media, as well as using the content your content for marketing purposes. You also waive any rights of privacy, publicity or other rights of a similar nature applicable to all such uses, to the extent permitted under applicable law. You represent and warrant that you have all necessary rights, power and authority to authorize us to use any content you submit. You also agree to the use of your content as mentioned above without any compensation to you.</p>

                        <h2 id='section6' className='mt-8 font-semibold text-xl sm:text-2xl'>6. Use Pawbloom at your own risk</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>Anyone can use Pawbloom to create and post content as well as instructors and we enable instructors and students to interact to teach and learn. Like other platforms where people can post content and interact, mistakes can happen and you use Pawbloom at your own risk.</p>
                        </div>

                        <p className='p_line_height mt-3'>The platform model means that we do not review or edit content for legal issues, and we do not have the authority to determine the legality of content. We do not exercise editorial control over the content available on the platform and therefore do not guarantee in any way the reliability, validity, accuracy or integrity of the content. If you access the content, you rely on any information provided by the instructor at your own risk.</p>

                        <p className='p_line_height mt-3'>By using the Services, you may be exposed to content that you consider offensive, indecent or objectionable. Pawbloom has no responsibility to separate such content from you and is not liable for your access to or enrollment in any courses or other content, to the extent permitted under applicable law. This also applies to any content related to health, fitness, and fitness. You acknowledge the risks and dangers inherent in the nature of this type of content and by accessing such content, you choose to voluntarily accept those risks, including the risk of illness, physical injury body, disability or death. You are solely responsible for the choices you make before, during and after accessing the content.</p>

                        <p className='p_line_height mt-3'>When you interact directly with a student or instructor, you must exercise caution when sharing these types of personal information. Although we limit the types of information that instructors can request from students, we do not control the actions that students and instructors take with the information they collect from others. other users on the platform. For your own safety, you should not share your email or other personal information about yourself.</p>

                        <p className='p_line_height mt-3'>We do not hire or employ instructors, and are not responsible or liable for any interactions between instructors and students. We are not responsible for disputes, claims, losses, injuries or damages of any kind that may arise from or in connection with the conduct of instructors or students.</p>

                        <p className='p_line_height mt-3'>When you use our Services, you will find links to other websites that we do not own or control. We are not responsible for the content or any other aspect of these third party websites, including their collection of information about you. You should also read their terms and conditions, as well as their privacy policy.</p>

                        <h2 id='section7' className='mt-8 font-semibold text-xl sm:text-2xl'>7. Pawbloom Permissions</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>We own the Pawbloom platform and Services, including the website, current or future applications and services, and things like logos, APIs, code, and content created by our employees. You may not tamper with them or use them without permission.</p>
                        </div>

                        <p className='p_line_height mt-3'>All rights, title and interest in and to the Pawbloom platform and Services, including current or future websites, applications, APIs, databases and content that its employees or Our partners submit or make available through our Services (but excluding content provided by instructors and students) are and will remain the exclusive property of Pawbloom and its licensors. Pawbloom. Our platforms and services are protected by copyright, trademark, and other laws of both the United States and foreign countries. There are no rights granted to you to use the Pawbloom name or any Pawbloom trademarks, logos, domain names, and other distinctive brand features. Any feedback, comments or suggestions you may provide regarding Pawbloom or the Services are entirely voluntary and we will be free to use such feedback, comments or suggestions as we see fit and without have any obligations to you.</p>

                        <h2 id='section8' className='mt-8 font-semibold text-xl sm:text-2xl'>8. Subscription package terms</h2>
                        <p className='p_line_height mt-3'>As part of your subscription to a Subscription, you will receive a limited, non-exclusive, non-transferable license from us to access and view the content contained in that Subscription through the Services. Except for the granting of lifetime access licenses, the terms contained in the “Content Enrollment and Lifetime Access” section above will apply to students enrolled through a Subscription Plan.</p>

                        <p className='p_line_height mt-3'>We reserve the right to revoke any license to use content in our Subscription Plans for legal or policy reasons at any time and in our sole discretion, for example if we no longer has the right to provide content through the Subscription Plan. Additional information about our revocation rights is provided in the “Content Enrollment and Lifetime Access” section.</p>

                        <p className='p_line_height mt-3'>You can start your subscription with a free trial. The free trial period for your subscription will be indicated during the registration process. Pawbloom determines free trial eligibility at our sole discretion and may limit access, eligibility, or free trial length. We reserve the right to terminate your free trial period and suspend your subscription if we determine that you are not eligible.</p>

                        <p className='p_line_height mt-3'>You must provide a payment method to subscribe to a Subscription Plan. By subscribing to a Subscription Plan and providing your payment information at checkout, you grant us and our payment providers permission to process payment for then applicable fees. via the payment method we keep on file for you. At the end of each subscription billing period, we will automatically renew your subscription for the same term and process your payment method for payment of then-applicable fees.</p>

                        <p className='p_line_height mt-3'>If we are unable to process payment through the payment method we have on file for you, or if you submit a dispute regarding charges charged to your payment method and chargebacks granted, we may suspend or terminate your subscription.</p>

                        <p className='p_line_height mt-3'>We reserve the right to change Subscription Plans or adjust prices for our Services at our sole discretion. Any changes in price or to your subscription plan will be effective upon our notice to you, unless otherwise required by applicable law.</p>

                        <h2 id='section9' className='mt-8 font-semibold text-xl sm:text-2xl'>9. Other legal terms</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>These Terms are like any other contract, containing boring but important legal terms that protect us from a myriad of things that could happen and clarify the legal relationship between us and you.</p>
                        </div>

                        <p className='p_line_height mt-3'>You agree that by registering for, accessing, or using our Services, you are entering into a legally binding contract with Pawbloom. If you do not agree to these Terms, please do not register for, access or use any of our Services.</p>

                        <p className='p_line_height mt-3'>If you are an instructor accepting these Terms and using our Services on behalf of a company, organization, government or other legal entity, you represent and warrant that you are authorized to do so. the above actions.</p>

                        <p className='p_line_height mt-3'>If you behave in a way that puts us in legal trouble, we may take legal action against you. You agree to indemnify, defend (if required by us) and hold harmless Pawbloom, our group companies and their officers, directors, suppliers, partners and agents us against any third party claim, demand, loss, damage or expense (including reasonable attorneys fees) arising out of: (a) content you post or submit; (b) your use of the Services; (c) your violation of these Terms or (d) your violation of any third party rights. Your indemnification obligation will survive termination of these Terms and your use of the Services.</p>

                        <h2 id='section10' className='mt-8 font-semibold text-xl sm:text-2xl'>10. Dispute resolution</h2>
                        <div className='border-l-4 border-solid border-[#ffcc00] bg-[#f9f9f9] p-4 my-4 mx-0'>
                            <p className='p_line_height'>If there is a dispute, our Support Team is always happy to help resolve the issue. If this doesn&apos;t work and you live in the United States or Canada, you may choose to sue in small claims court or file a claim in binding individual arbitration You may not sue in another court or participate in a class, non-individual action against us.</p>
                        </div>

                        <p className='p_line_height mt-3'>Pawbloom commits to making every effort to resolve disputes with Pawbloom users without filing a formal legal complaint. If a problem arises between the two parties, you and Pawbloom agree to first work diligently and in good faith to reach a solution that is fair and equitable to both parties using the dispute resolution process Not officially required are described below. Sometimes, a third party may be necessary to help resolve a dispute between two parties. This dispute resolution agreement limits how these disputes will be resolved.</p>

                        <p className='p_line_height mt-3'>
                            <strong>YOU AND Pawbloom AGREE THAT ANY AND ALL DISPUTES, CLAIMS OR CONTROVERSIES ARISING OUT OF OR RELATING TO THESE TERMS OR THEIR APPLICABILITY, BREACH, TERMINATION, VALIDITY, ENFORCEMENT OR DISSOLUTION LIKE THEM OR THE USE OF THE SERVICES OR COMMUNICATIONS WITH Pawbloom (COLLECTIVELY, “DISPUTES”) THAT ARE NOT INFORMALLY RESOLVED MUST BE RESOLVED EXCLUSIVELY IN A SMALL CLAIMS COURT OR THROUGH BINDING INDIVIDUAL ARBITRATION AND AGREE TO WAIVE THE RIGHT TO A JURY TRIAL AND TO FILE A CLAIM IN ANY OTHER COURT.</strong>
                        </p>

                        <p className='p_line_height mt-3'>You and Pawbloom agree that this Dispute Resolution Agreement applies to each party as well as all of their respective agents, attorneys, contractors, subcontractors, service providers, employees, and all others representing or on behalf of you and Pawbloom. This dispute resolution agreement is binding on your and Pawbloom&apos;s respective heirs, successors, and assigns, and is governed by the Federal Arbitration Act.</p>
                        <p className='p_line_height mt-3'>Disputes that arise but are not resolved through the mandatory informal dispute resolution process may be brought in small claims court located in: (a) San Francisco, California; (b) the county in which you live; or (c) another place mutually agreed upon by both parties. Each party hereby waives the right to bring any Dispute between them in courts other than small claims courts, including courts of general or special jurisdiction.</p>

                        <p className='p_line_height mt-3'>As the only alternative to small claims court, you and Pawbloom have the right to resolve Disputes through individual arbitration. Although there is no judge or jury in arbitration, the arbitrator has the same authority to award individual relief and must follow the agreement of the parties in the same way as a court would. . If either party brings the Dispute to a court other than a small claims court, the other party may ask the court to order the parties to arbitration. Either party may also ask the court to stay the court proceedings while the arbitration proceedings are ongoing. In the event any cause of action or claim cannot be resolved in arbitration, you and Pawbloom agree that all court proceedings will be pending resolution in arbitration. of all causes of action and claims. Nothing in this Dispute Resolution Agreement is intended to limit individual relief available to either party in arbitration or small claims court.</p>

                        <h2 id='section11' className='mt-8 font-semibold text-xl sm:text-2xl'>11. Cập nhật những điều khoản</h2>
                        <p className='p_line_height mt-3'>Thỉnh thoảng, chúng tôi có thể cập nhật các Điều khoản này để làm rõ các hoạt động của mình hoặc để phản ánh các hoạt động mới hoặc khác (chẳng hạn như khi thêm các tính năng mới) và Pawbloom có toàn quyền quyết định, theo quyết định riêng của chúng tôi, để sửa đổi hoặc thực hiện các thay đổi đối với các Điều khoản này bất kỳ lúc nào. Nếu chúng tôi thực hiện các thay đổi đáng kể, chúng tôi sẽ thông báo cho bạn bằng các phương tiện ưu tiên, chẳng hạn như thông báo qua email được gửi đến địa chỉ email được chỉ định trong tài khoản của bạn hoặc bằng cách đăng thông báo qua các dịch vụ của Chúng tôi. Các sửa đổi sẽ có hiệu lực vào ngày đăng trừ khi có quy định khác.</p>
                        <p className='p_line_height mt-3'>Your continued use of our Services after changes take effect means you accept those changes. Any revised Terms will supersede all prior Terms.</p>

                        <h2 id='section12' className='mt-8 font-semibold text-xl sm:text-2xl'>12. Làm sao để liên hệ chúng tôi</h2>
                        <p className='p_line_height mt-3'>Qua email: <a href="mailto:support@pawbloom.com">support@pawbloom.com</a></p>
                        <p className='p_line_height mt-1 mb-8'>Qua số điện thoại: +84 123 456 789</p>
                    </div>
                </div>
            </div>
        </TermsLayout>
    )
}

export default TermPage
