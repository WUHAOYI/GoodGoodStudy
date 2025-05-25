
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = () => {
    // Simulate payment processing
    console.log('Processing payment for:', course?.title);
    
    // Redirect to success page
    navigate('/payment-success', { 
      state: { 
        course,
        orderId: `ORD-${Date.now()}`,
        amount: course?.price || 0
      }
    });
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">No course selected</h2>
            <Button onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </Button>
                    <Button
                      variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      PayPal
                    </Button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    {/* Billing Information */}
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Billing Information</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Card Information */}
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Card Information</Label>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">PayPal integration coming soon</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  Your payment information is secure and encrypted
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={paymentMethod === 'paypal'}
                >
                  Complete Payment - ${course.price}
                </Button>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-gray-600">By {course.instructor}</p>
                    <Badge variant="outline" className="mt-1">{course.level}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Course Price:</span>
                    <span>${course.originalPrice || course.price}</span>
                  </div>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-${course.originalPrice - course.price}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Taxes:</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${course.price}</span>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What's included:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Lifetime access to course materials</li>
                    <li>• Certificate of completion</li>
                    <li>• 30-day money-back guarantee</li>
                    <li>• Mobile and desktop access</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
