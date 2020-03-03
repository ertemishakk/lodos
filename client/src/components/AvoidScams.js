import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Container } from 'reactstrap'
class AvoidScams extends Component {
    render() {
        return (
            <Container className='mb-5'>
                <h4>Avoiding Scams</h4>
                <ListGroup>
                    <ListGroupItem >
                        Deal locally, face-to-face —follow this one rule and avoid 99% of scam attempts.
                </ListGroupItem>
                    <ListGroupItem >
                        Do not provide payment to anyone you have not met in person.
                </ListGroupItem>
                    <ListGroupItem >
                        Beware offers involving shipping - deal with locals you can meet in person.
                </ListGroupItem>
                    <ListGroupItem >
                        Never wire funds (e.g. Western Union) - anyone who asks you to is a scammer.
                </ListGroupItem>
                    <ListGroupItem >
                        Don't accept cashier/certified checks or money orders - banks cash fakes, then hold you responsible.
                </ListGroupItem>
                    <ListGroupItem >
                        Transactions are between users only, no third party provides a "guarantee".                </ListGroupItem>
                    <ListGroupItem >
                        Never give out financial info (bank account, social security, paypal account, etc).
                </ListGroupItem>
                    <ListGroupItem >
                        Do not rent or purchase sight-unseen—that amazing "deal" may not exist.
                </ListGroupItem>
                    <ListGroupItem >
                        Refuse background/credit checks until you have met landlord/employer in person.
                </ListGroupItem>

                </ListGroup>

                <h5 className='mt-3'>Examples of Scams</h5>
                <ListGroup>
                    <ListGroupItem>
                        <span className='font-weight-bold'>
                            1. Someone claims your transaction is guaranteed,
                            that a buyer/seller is officially certified, OR that a
                        third party of any kind will handle or provide protection for a payment:</span>
                        <br />
                        These claims are fraudulent, as transactions are between
                        users only.
The scammer will often send an official looking (but fake) email that appears to come
from craigslist or another third party, offering a guarantee, certifying a seller, or
pretending to handle payments.
                   </ListGroupItem>
                    <ListGroupItem>
                        <span className='font-weight-bold'>
                            2. Distant person offers a genuine-looking (but fake) cashier's check:
                        </span> <br />
                        You receive an email or text (examples below) offering to buy your item, pay for your services in advance, or rent your apartment, sight unseen and without meeting you in person.
A cashier's check is offered for your sale item as a deposit for an apartment or for your services.
Value of cashier's check often far exceeds your item—scammer offers to "trust" you, and asks you to wire the balance via money transfer service.
Banks will cash fake checks AND THEN HOLD YOU RESPONSIBLE WHEN THE CHECK FAILS TO CLEAR, sometimes including criminal prosecution.
Scams often pretend to involve a 3rd party (shipping agent, business associate, etc.).
                   </ListGroupItem>
                    <ListGroupItem>
                        <span className='font-weight-bold'>
                            3. Someone requests wire service payment via Western Union or MoneyGram:
                        </span> <br />
                        Deal often seems too good to be true, price is too low, or rent is below market, etc.
Scam "bait" items include apartments, laptops, TVs, cell phones, tickets, other high value items.
Scammer may (falsely) claim a confirmation code from you is needed before he can withdraw your money.
Common countries currently include: Nigeria, Romania, UK, Netherlands—but could be anywhere.
Rental may be local, but owner is "travelling" or "relocating" and needs you to wire money abroad.
Scammer may pretend to be unable to speak by phone (scammers prefer to operate by text/email).
                   </ListGroupItem>
                    <ListGroupItem>
                        <span className='font-weight-bold'>

                            4. Distant person offers to send you a cashier's check or money order and then have you wire money:
                        </span> <br />
                        This is ALWAYS a scam in our experience—the cashier's check is FAKE.
Sometimes accompanies an offer of merchandise, sometimes not.
Scammer often asks for your name, address, etc. for printing on the fake check.
Deal often seems too good to be true.
                               </ListGroupItem>
                </ListGroup>
            </Container>
        )
    }
}
export default AvoidScams