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
/*--------------------------------------------------------------------------------------------------------------*/
void solve(){
    ll n = nxt();
    vec v(n);
    ll flag=1;
    for (ll i = 0; i < n; i++)
    {
        cin>>v[i];
        if(i > 0 && v[i] != v[i-1]){
            flag=0;
        }
    }
    if(flag){
        c(-1);
    }
    else{
        ll ans=INT_MAX,val = v[0],cnt=0;
        for (ll i = 0; i < n; i++)
        {
            if(v[i] != val){
                ans = min(ans,cnt);
                cnt=0;
            }
            else{
                cnt++;
            }
        }
        c(min(ans,cnt));
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