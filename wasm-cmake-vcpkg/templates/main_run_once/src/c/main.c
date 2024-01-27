#import <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int answer = add(1, 2);
    printf("1 + 2 = %d\n", answer);
    printf("Done.");
    return 0;
}

