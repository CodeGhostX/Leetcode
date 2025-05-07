#include <iostream>
using namespace std;

void find(){
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
}

int main()
{
    int t;
    cin >> t;
    while(t--) find();

    return 0;
}