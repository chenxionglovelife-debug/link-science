import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Card, CardContent } from './ui/card';
import { 
  User, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  Smartphone,
  Mail,
  Zap,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userInfo: any) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [forgotForm, setForgotForm] = useState({
    phone: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleLogin = async () => {
    setIsLoading(true);
    // 模拟登录API调用
    setTimeout(() => {
      const userInfo = {
        nickname: '青春编程者',
        phone: '138****5678',
        institution: '链科学编程学院',
        avatar: '/placeholder-avatar.jpg',
        memberships: ['个人会员', '比赛会员'],
        level: 25,
        xp: 12580,
        nextLevelXp: 15000
      };
      onLoginSuccess(userInfo);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    // 模拟注册API调用
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('login');
    }, 1500);
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    // 模拟忘记密码API调用
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('login');
    }, 1500);
  };

  const sendVerificationCode = (phone: string) => {
    // 模拟发送验证码
    console.log('发送验证码到:', phone);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0">
        <div className="p-8 pb-0">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl blur-lg opacity-30 animate-pulse"></div>
              </div>
            </div>
            <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              欢迎来到 CodeQuest
            </DialogTitle>
            <DialogDescription>
              开启你的编程学习之旅
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            {/* 登录 */}
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名/手机号</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      placeholder="请输入用户名或手机号"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="请输入密码"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? '登录中...' : '登录'}
                </Button>
                
                <div className="text-center">
                  <Button 
                    variant="link" 
                    className="text-sm text-blue-600 hover:text-blue-700 underline p-0 h-auto"
                    onClick={() => setActiveTab('forgot')}
                  >
                    忘记密码？
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">或</span>
                </div>
              </div>

              {/* 微信登录 */}
              <Card className="p-4 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">微信扫码登录</div>
                      <div className="text-sm text-muted-foreground">使用微信扫描二维码快速登录</div>
                    </div>
                    <Button size="sm" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                      扫码
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 注册 */}
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">用户名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-username"
                      placeholder="请设置用户名"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-phone">手机号</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-phone"
                      placeholder="请输入手机号"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verification">验证码</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="verification"
                        placeholder="请输入验证码"
                        value={registerForm.verificationCode}
                        onChange={(e) => setRegisterForm({...registerForm, verificationCode: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => sendVerificationCode(registerForm.phone)}
                      disabled={!registerForm.phone}
                    >
                      获取验证码
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="请设置密码"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">确认密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="请确认密码"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleRegister}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={isLoading}
                >
                  {isLoading ? '注册中...' : '注册账号'}
                </Button>
              </div>
            </TabsContent>

            {/* 忘记密码 */}
            <TabsContent value="forgot" className="space-y-4">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium">找回密码</h3>
                  <p className="text-sm text-muted-foreground">请按照以下步骤重置您的密码</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="forgot-phone">手机号</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="forgot-phone"
                      placeholder="请输入注册手机号"
                      value={forgotForm.phone}
                      onChange={(e) => setForgotForm({...forgotForm, phone: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forgot-verification">验证码</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="forgot-verification"
                        placeholder="请输入验证码"
                        value={forgotForm.verificationCode}
                        onChange={(e) => setForgotForm({...forgotForm, verificationCode: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => sendVerificationCode(forgotForm.phone)}
                      disabled={!forgotForm.phone}
                    >
                      获取验证码
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">新密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="请设置新密码"
                      value={forgotForm.newPassword}
                      onChange={(e) => setForgotForm({...forgotForm, newPassword: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">确认新密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-new-password"
                      type="password"
                      placeholder="请确认新密码"
                      value={forgotForm.confirmPassword}
                      onChange={(e) => setForgotForm({...forgotForm, confirmPassword: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleForgotPassword}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? '重置中...' : '重置密码'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('login')}
                    className="w-full"
                  >
                    返回登录
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            登录即表示同意 
            <Button variant="link" className="p-0 h-auto text-blue-600">
              《用户协议》
            </Button>
            和
            <Button variant="link" className="p-0 h-auto text-blue-600">
              《隐私政策》
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}