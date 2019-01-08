import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history,app }) {
    const Home = dynamic({component: () => import('./routes/home/home')});
    const MainLayout = dynamic({component: () => import('./routes/mainLayout')});
    const Login = dynamic({component: () => import('./routes/login/login')});
    const Welcome = dynamic({component: () => import('./routes/welcome/welcome')});
    const AdminList = dynamic({component: () => import('./routes/authorization/adminList')});
    const CustomList = dynamic({component: () => import('./routes/custom/customList')});
    const SalesMenList = dynamic({component: () => import('./routes/custom/salesMenList')});
    const ApiList = dynamic({component: () => import('./routes/authorization/apiList')});
    const MenuManage = dynamic({component: () => import('./routes/authorization/menuManage')});
    const RoleManage = dynamic({component: () => import('./routes/authorization/roleManage')});
    const CustomFeedback = dynamic({component: () => import('./routes/businessManage/customFeedback')});
    const AuditInsurance = dynamic({component: () => import('./routes/insuranceManage/auditInsurance')});
    const OrderDetail = dynamic({component: () => import('./routes/insuranceManage/orderDetail')});
    const RejectList = dynamic({component: () => import('./routes/insuranceManage/rejectList')});
    const TreatInsurance = dynamic({component: () => import('./routes/insuranceManage/treatInsurance')});
    const LifeAgreementList = dynamic({component: () => import('./routes/agreement/lifeAgreementList')});
    const CarAgreementList = dynamic({component: () => import('./routes/agreement/carAgreementList')});
    const NoMatch = dynamic({component: () => import('./routes/noMatch')});

    return (
		<Router history={history}>
		    <Switch>
                <Route path="/login" component={Login}/>
                <MainLayout>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/welcome' exact component={Welcome}/>
                        <Route path='/authorization' render={({match})=>
                            <Switch>
                               <Route path={`${match.url}/adminList`} exact component={AdminList}/> 
                               <Route path={`${match.url}/apiList`} exact component={ApiList} /> 
                               <Route path={`${match.url}/menuManage`} exact component={MenuManage}/> 
                               <Route path={`${match.url}/roleManage`} exact component={RoleManage}/> 
                            </Switch>
                        }/>
                        <Route path='/businessManage' render={({match})=>
                            <Route path={`${match.url}/customFeedback`} exact component={CustomFeedback}/> 
                        }/>
                        <Route path='/insuranceManage' render={({match})=>
                            <Switch>
                               <Route path={`${match.url}/auditInsurance`} exact component={AuditInsurance}/> 
                               <Route path={`${match.url}/orderDetail`} exact component={OrderDetail}/> 
                               <Route path={`${match.url}/rejectList`} exact component={RejectList}/> 
                               <Route path={`${match.url}/treatInsurance`} exact component={TreatInsurance}/> 
                            </Switch>
                        }/>
                        <Route path='/agreement' render={({match})=>
                            <Switch>
                               <Route path={`${match.url}/lifeAgreementList`} exact component={LifeAgreementList}/> 
                               <Route path={`${match.url}/carAgreementList`} exact component={CarAgreementList}/> 
                            </Switch>
                        }/>
                        <Route path='/custom' render={({match})=>
                            <Switch>
                               <Route path={`${match.url}/customList`} exact component={CustomList}/> 
                               <Route path={`${match.url}/salesMenList`} exact component={SalesMenList}/> 
                            </Switch>
                        }/>
                        <Route path="/" exact render={()=><Redirect to="/home" />}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </MainLayout>
            </Switch>
	    </Router>
    );
}

export default RouterConfig;
