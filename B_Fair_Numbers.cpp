#include<bits/stdc++.h>
using namespace std;

#define FAST_IO             (ios_base:: sync_with_stdio(false),cin.tie(NULL));


#define ll                  long long
#define ull                 unsigned long long
#define max_3(x,y,z)        max(max(x,y),z)
#define max_4(w,x,y,z)      max(max(x,y),max(w,z))

#define c(x)                cout<<x<<endl;
#define c2(x,y)             cout<<x<<" "<<y<<endl;
int vectr;
#define in(a,n)           for(int i=0;i<n;i++) cin>>a[i];
#define out(a,n)          for(int i=0;i<n;i++) cout<<a[i]<<" ";
#define inv(a,n)          for(int i=0;i<n;i++) {cin>>vectr; a.push_back(vectr);}

#define ff                  first
#define ss                  second 
#define pb                  push_back
#define all(x)              x.begin(), x.end()
#define sz(x)               (int)(x).size();

#define yes                 cout<<"YES"<<endl;
#define no                  cout<<"NO"<<endl;

#define PI                  3.141592653589793238
#define MIN                 INT_MIN
#define MAX                 INT_MAX
#define INF                 LONG_LONG_MAX
#define MOD                 1000000007
#define LLM                 1000000000000000007

ll setbit(ll x){
    return __builtin_popcountll(x);
}
ll bit(ll x){
    return ((int)log2(x) + 1);
}
using vec = vector<ll>;
using pii=pair<ll,ll>;
using mapi=map<ll,ll>;
using si=set<ll>;

inline int nxt() {
    int x;
    cin >> x;
    return x;
}
int chec(vec &v,ll n){
    int bo = 1;
        out(v,v.size());
    for(ll i=0 ; i<v.size();i++){
        
        if(n%v[i]){
            bo =0;
            break;
        }
        c(v[i]);
    }
    c(bo);
    return bo;

}
/*--------------------------------------------------------------------------------------------------------------*/
void solve(){
    ll n;
    cin>>n;
    ll ans=n,a=n,flag=1;
    vec v;
    for (ll i = n ; ; i++)
        {
            int d = 0;
            ll a = i;
            while (a!= 0)
            {
                 int c = a%10;
                 a=  a/10;
                 if (c!=0)
                 {
                    if(i%c!=0)
                 {
                    d=1;
                    break;
                 }
                 }
                 
            }
            
            if (d==0)
            {
                cout<<i<<endl;
                break;
            }
            
 
        }
        

}
int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    int t;
    cin>>t;
    while(t--)
    {
     solve();   
    }
return 0;
}