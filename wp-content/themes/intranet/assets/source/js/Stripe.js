Intranet = Intranet || {};
Intranet.Stripe = (function ($) {

    var targetSelector = '.hero .stripe';
    var $targetElement = $(targetSelector);

    var playLog = [];
    var magicCode = [0, 1, 2, 3, 4];
    var magicHappend = false;

    var instruments = [
        {
            name: 'Piano',
            path: 'piano',
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NDMuOTgxIiBoZWlnaHQ9IjQ0My45ODEiIHZpZXdCb3g9IjAgMCA0NDMuOTgxIDQ0My45ODEiPjxwYXRoIGQ9Ik00NDMuOTggMTM0Ljk4bC0yNS4xNjYtMTQuMjc0Yy0yNS4xNjMtMTQuMjU2LTE4LjE3LTE3LjE4NC0yOS4zNjItMzkuNTU1LTExLjE3Ny0yMi4zNzItNDYuMTM4LTIyLjM3Mi00Ni4xMzgtMjIuMzcyTDQ1LjUyMiAxMjIuNjE1bDMxNS4yOCA1My43NzUgODMuMTgtNDEuNDF6bS04NS45ODIgNDguNDlMNDUuNTIyIDEyOC40MTR2NTguMjkyTDAgMjA0Ljg4djM5LjE0bDc2Ljc2IDExLjIxNiAxNy44NzQgOTUuOTIyYzEuMDYyIDUuNzAzIDIuNzggNS43MDMgMy44NSAwbDE2LjgyMi05MC4yOTUgNDYuOTYgNi44N3Y3MC40OGwtMjAuNDUtMS41MDJ2MTkuNTU0bDg1LjQ2NSA2LjI4NHYtMTkuNTMybC0xOS40MDItMS40NDN2LTY3LjE5Nmw2OC42OTMgMTAuMDQgMTcuOTg3IDk2LjUxOGMxLjA1OCA1LjY5NCAyLjc4NSA1LjY5NCAzLjg1IDBsMTYuOTMtOTAuODU2IDE4LjEyOCAyLjY0NS43NzMtMzcuNTE4IDIzLjc2LTEzLjk3VjE4My40N3pNMTk1LjMgMzQwLjY1NWwtMjAuNDQyLTEuNTAzdi02OS41OGwyMC40NDIgMi45ODh2NjguMDk1em0xMTcuOTYzLTc1LjEzMkwyNC45IDIyNC42MzNsNDQuNTY0LTE4LjM2IDYuNTA4Ljk2LTE5LjI3NCAxMy4wMjUgMTAuNDkgMi43ODcgMTMuMjU4LTE1LjE1NCAxOS41NTYgMi44NzctMTguMTUgMTIuMjcgMTAuNDg4IDIuNzkgMTIuNTUzLTE0LjM0NyAxOS4xNjIgMi44My0xNy4wNSAxMS41MTYgMTAuNDg4IDIuNzk3IDExLjg0Ni0xMy41NSA0Mi44IDYuMzE1LTE0Ljg0IDEwLjAyIDEwLjQ4NyAyLjc5OCAxMC40MzYtMTEuOTI0IDE3Ljk1MyAyLjY0LTEzLjcyIDkuMjg0IDEwLjQ4NiAyLjc5NyA5LjcyLTExLjEzIDQxLjYwMyA2LjEzMy0xMS41MSA3Ljc5IDEwLjQ4IDIuNzkgOC4zMjctOS41MDYgNDAuNzgzIDYuMDItOS4yOSA2LjI5IDEwLjQ4OCAyLjc4NiA2LjktNy44OSAzMi4yMiA0Ljc1Mi0xOS40IDIwLjQ4NXoiLz48cGF0aCBkPSJNMzY0LjY0MiAyNDYuNDhsLTI0LjQ3IDEzLjk2NnYzMy4yMTRsMTAzLjgxLTcwLjYxNVYxNDMuNTJsLTc5LjM0IDQwLjczN3oiLz48L3N2Zz4='
        },
        {
            name: 'Drums',
            path: 'drums',
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PHBhdGggZD0iTTYwIDUuOThhMSAxIDAgMCAwLTEtMWMtNC4zNjQgMC02LjExMi4zMjgtNyAuODc4LS44ODgtLjU1LTIuNjM2LS44OC03LS44OGExIDEgMCAwIDAgMCAyYzUuMDM3IDAgNS44Ny40NzUgNS45ODYuNTg4LjAxNS4wNS4wMTUuMjEuMDE0LjMyN3Y2LjYyNEwzNy45MTUgMTcuOTdhMS43IDEuNyAwIDAgMC0xLjA0Ny43OTcgMS43MSAxLjcxIDAgMCAwLS4xNzQgMS4zMDZsLjk0NiAzLjUzMkExOC45NDQgMTguOTQ0IDAgMCAwIDMxIDIyLjAxM1YxNS45OGg2YTEgMSAwIDAgMCAwLTJIMjNhMSAxIDAgMCAwIDAgMmg2djYuMDMzYy0yLjI5LjEyMi00LjUzOC42NjMtNi42NCAxLjU5MmwuOTQ1LTMuNTMyYy4xMi0uNDQ0LjA1OC0uOTA3LS4xNzQtMS4zMDZhMS43IDEuNyAwIDAgMC0xLjA0NC0uNzk3TDkgMTQuNTE4di02LjU0YzAtLjAxMy0uMDA3LS4wMjQtLjAwOC0uMDM4IDAtLjAxMy4wMDgtLjAyNC4wMDgtLjAzOHYtLjAwOGMwLS4xMTggMC0uMjc4LS4wMDUtLjI5NS4xMzYtLjE0OC45NjgtLjYyIDYuMDA1LS42MmExIDEgMCAwIDAgMC0yYy00LjM2NCAwLTYuMTEyLjMyNy03IC44NzctLjg4OC0uNTUtMi42MzYtLjg4LTctLjg4YTEgMSAwIDAgMCAwIDJjNS4wMzcgMCA1Ljg3LjQ3NSA1Ljk4Ni41ODguMDE1LjA1LjAxNS4yMS4wMTQuMzI4djYuMDk2bC0xLjk4NS0uNTI0Yy0uODktLjIzOC0xLjg1NS4zMjMtMi4wOTUgMS4yMTVsLTEuNyA2LjM0N2MtLjEyLjQ0My0uMDU4LjkwNi4xNzIgMS4zMDMuMjMuMzk4LjYwMy42ODMgMS4wNDguOEw3IDI0LjMzNHYyNy4yMzNMLjI5MyA1OC4yNzNhMSAxIDAgMCAwIDEuNDE0IDEuNDEzTDcgNTQuMzk0djQuNTg2YTEgMSAwIDAgMCAyIDB2LTQuNTg2bDUuMjkzIDUuMjkzYS45OTcuOTk3IDAgMCAwIDEuNDE0IDAgMSAxIDAgMCAwIDAtMS40MTRMOSA1MS41NjVWMjQuODZsOC4xNTQgMi4xNUExOC43ODcgMTguNzg3IDAgMCAwIDExIDQwLjk4YzAgNi42IDMuMzg4IDEyLjQyIDguNTEyIDE1LjgyN2wtLjQ4MiAxLjkzYS45OTguOTk4IDAgMCAwIC45NyAxLjI0IDEgMSAwIDAgMCAuOTctLjc1N2wuMzQtMS4zNjVjMi42MDggMS4zNDggNS41NTggMi4xMjMgOC42OSAyLjEyM3M2LjA4Mi0uNzc1IDguNjktMi4xMjNsLjM0IDEuMzY1YTEgMSAwIDAgMCAxLjk0LS40ODRsLS40ODItMS45M0M0NS42MTIgNTMuNDAyIDQ5IDQ3LjU4MiA0OSA0MC45OGExOC43ODQgMTguNzg0IDAgMCAwLTYuMTU0LTEzLjk3TDUxIDI0Ljg2djI2LjcwNmwtNi43MDcgNi43MDdhMSAxIDAgMCAwIDEuNDE0IDEuNDE0TDUxIDU0LjM5NHY0LjU4NmExIDEgMCAwIDAgMiAwdi00LjU4Nmw1LjI5MyA1LjI5M2EuOTk3Ljk5NyAwIDAgMCAxLjQxNCAwIDEgMSAwIDAgMCAwLTEuNDE0TDUzIDUxLjU2NVYyNC4zMzNsNC41NjItMS4yMDNhMS43MTIgMS43MTIgMCAwIDAgMS4wNDYtLjhjLjIzLS4zOTYuMjktLjg2LjE3Mi0xLjMwM2wtMS43LTYuMzQ3Yy0uMjQtLjg5LTEuMjAzLTEuNDUyLTIuMDk1LTEuMjE0TDUzIDEzLjk5VjcuOThjMC0uMDE1LS4wMDctLjAyNi0uMDA4LS4wNCAwLS4wMTMuMDA4LS4wMjQuMDA4LS4wMzh2LS4wMWMwLS4xMTYgMC0uMjc2LS4wMDUtLjI5NC4xMzYtLjE0NS45NjgtLjYyIDYuMDA1LS42MmExIDEgMCAwIDAgMS0xem0tMTYgMzVjMCA3LjcyLTYuMjggMTQtMTQgMTRzLTE0LTYuMjgtMTQtMTQgNi4yOC0xNCAxNC0xNCAxNCA2LjI4IDE0IDE0em0xLTM3YzQuMzY0IDAgNi4xMTItLjMzIDctLjg4Ljg4OC41NSAyLjYzNi44OCA3IC44OGExIDEgMCAwIDAgMC0yYy01LjAzNyAwLTUuODctLjQ3NS01Ljk4Ni0uNTg4QTEuODU0IDEuODU0IDAgMCAxIDUzIDEuMDY1Vi45OGMwLS41NTMtLjQ0Ni0uOTYtLjk5OC0uOTZINTJjLS41NSAwLS45OTguNDg1LTEgMS4wMzZ2LjAxYzAgLjExNiAwIC4yNzYuMDA1LjI5NC0uMTM2LjE0Ni0uOTY4LjYyLTYuMDA1LjYyYTEgMSAwIDAgMCAwIDJ6bS00NCAwYzQuMzY0IDAgNi4xMTItLjMzIDctLjg4Ljg4OC41NSAyLjYzNi44OCA3IC44OGExIDEgMCAwIDAgMC0yYy01LjAzNyAwLTUuODctLjQ3NS01Ljk4Ni0uNTg4QTEuODQzIDEuODQzIDAgMCAxIDkgMS4wNjVWLjk4YzAtLjU1My0uNDQ2LS45Ni0uOTk4LS45NkM3LjQ4LjA2IDcuMDAyLjUwNSA3IDEuMDU3di4wMWMwIC4xMTYgMCAuMjc2LjAwNS4yOTMtLjEzNi4xNDYtLjk2OC42Mi02LjAwNS42MmExIDEgMCAwIDAgMCAyeiIvPjxwYXRoIGQ9Ik0zNC41IDM5Ljk4Yy0yLjQ4IDAtNC41IDIuMDE4LTQuNSA0LjVzMi4wMiA0LjUgNC41IDQuNSA0LjUtMi4wMiA0LjUtNC41LTIuMDItNC41LTQuNS00LjV6Ii8+PC9zdmc+'
        },
        {
            name: 'Guitar',
            path: 'guitar',
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIuMDAzIDUxMi4wMDMiPjxwYXRoIGQ9Ik00OTcuOTQyIDE0LjA2MmMtMTguNzQyLTE4Ljc1LTQ5LjE0LTE4Ljc1LTY3Ljg4IDBsLTQ4IDQ4Yy0xMC4wMTMgMTAuMDEtMTQuNTA0IDIzLjMzNC0xMy44MiAzNi40NDNsLTg1Ljg1NyA4NS44NTdjLTIyLjI0LTE3LjY5LTQxLjM1OC0yNS4yMTgtNjEuMDE4LTI0LjMxMi0zMi44ODYgMS4zMDUtNTMuNjcgMjUuNjk1LTc1LjY3NCA1MS41MTQtOC43ODUgMTAuMzA0LTE3Ljg3IDIwLjk2OC0yNy45MSAzMS4wOTMtMy4xNjcgMi4zNTItMTQuNzUgNi45ODQtMjMuMjA1IDEwLjM2Ny0zMy4xOCAxMy4yOC04My4zMTQgMzMuMzQzLTkzLjAxNyA4MC42My03LjMyNiAzNS43MSAxMS4xMyA3NS4wODUgNTYuNDIgMTIwLjM3MyAzOC44NzMgMzguODc0IDczLjM4IDU3Ljk3NSAxMDQuOTUzIDU3Ljk3NWE3Ni4zMiA3Ni4zMiAwIDAgMCAxNS40MDItMS41NjJjNDcuMjkyLTkuNzAzIDY3LjM0Ni01OS44NSA4MC42MTUtOTMuMDMgMy4yODQtOC4yMSA3Ljc1LTE5LjM2NiAxMC4xNi0yMi45MiAxMC43MTctMTAuNjY0IDIxLjE5OC0xOS41OTMgMzEuMzQyLTI4LjIzNCAyNS44MTItMjEuOTg0IDUwLjE5LTQyLjc1IDUxLjUwMy03NS42MjMuNzg1LTE5LjYzMi02LjY4My0zOC43Ni0yNC4zMy02MS4wMDJsODUuODc0LTg1Ljg3M2MuODM2LjA0NSAxLjY2NC4yNCAyLjUwNC4yNCAxMi4yODUgMCAyNC41Ny00LjY4NyAzMy45NC0xNC4wNjJsNDgtNDhjMTguNzQzLTE4Ljc0IDE4Ljc0My00OS4xMy0uMDAzLTY3Ljg3MnptLTI3My45MzQgMzA1LjkzYy0xNy42NyAwLTMyLTE0LjMyOC0zMi0zMnMxNC4zMy0zMS45OTggMzItMzEuOTk4YzE3LjY3MyAwIDMyIDE0LjMyNiAzMiAzMiAwIDE3LjY3LTE0LjMyNyAzMS45OTgtMzIgMzEuOTk4eiIvPjwvc3ZnPg=='
        },
        {
            name: 'Trumpet',
            path: 'trumpet',
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNDUuODYxIiBoZWlnaHQ9IjM0NS44NjEiIHZpZXdCb3g9IjAgMCAzNDUuODYxIDM0NS44NjEiPjxwYXRoIGQ9Ik0zMzkuOTggMTAyLjcwNUMzMzQuNzY1IDgzLjI0MyAyNTQuMyA0LjI5MiAyMzkuMzkuM2MtMy42NjMtLjk5NS01Ljg2Ny43NDQtNi42NDcgMS41MTgtMS4zMDMgMS4yOS0yLjU3IDMuNjE1LTEuMzc1IDcuNDM1IDQuMTYgMTMuMTE3LTMuNTggNTcuNDI0LTkuNzc2IDg0LjAxM2wtLjEzOC41MDQtNTkuMjc2IDU5LjMwNi02LjMwOC02LjI3OCA2LjQ2LTYuNTA2LTcuMTM2LTcuMDk1LTE4LjA2OCAxOC4xMiA3LjE2NCA3LjEyMiA2LjQ4Mi02LjUwOCA2LjMwOCA2LjI2LTE2Ljk4NyAxNi45OTctNi4yMy02LjIwNyA2LjQ4OC02LjUyLTcuMTItNy4xMTgtMTguMDQgMTguMTIgNy4xNTYgNy4xMiA2LjQzMi02LjUgNi4yIDYuMTg3LTE2LjQzMiAxNi40NTMtNi4yMTUtNi4yMSA2LjQzOC02LjQ2Ny03LjEyLTcuMTM1LTE4LjA0IDE4LjEyMyA3LjE2MyA3LjEyNyA2LjQ2LTYuNTI2IDYuMjIgNi4xOS0xNi44MTMgMTYuNzk1LTYuMTYtNi4xMiA2LjEzLTYuMTY2LTcuMTU4LTcuMTE2LTE4LjAzIDE4LjEyIDcuMTM4IDcuMTMgNi44MTItNi44NTggNi4xNyA2LjEtNzQuMTY0IDc0LjIwOC0uODQ0LS4wOWMtMy4wMS0uMjM0LTUuOTc4LjgzNS04LjA4NSAyLjk2Ni0zLjk4IDQuMDA2LTMuOTU0IDEwLjUyLjAzIDE0LjUwOGwxOS42OTYgMTkuNjg0YzQuMDA4IDQuMDEyIDEwLjU1IDQuMDEyIDE0LjU2MiAwIDIuOTc2LTIuOTggMy44MTYtNy41NzggMi4wOTYtMTEuNDVsLS40OS0xLjEzNiAxOS44MDctMTkuODA0IDEuMDE1IDIuNTZjMy4yMyA4LjI2MiA4LjA3NSAxNS42NzggMTQuNDA3IDIyLjAxMiAyNC4wMiAyMy45NzggNjMuNTcyIDI0Ljk3NSA4OC44MDcgMi40NTdsMy4wMzItMi44MzQgOTAuMTQtOTAuMTA3YzI1LjIyNy0yNS4yNCAyNS4yMjctNjYuMzEgMC05MS41MzJhNjQuNTE2IDY0LjUxNiAwIDAgMC0yMC44ODUtMTMuOTY0bC0yLjUxNi0xLjAxNSAxMC4xNTMtMTAuMTcuNDctLjEyM2MyNS4xODQtNi42MzUgNjcuNDUtMTQuMDcgODAuNzI4LTcuMzYyYTUuMjcgNS4yNyAwIDAgMCAxLjk4My41NjJjMi44MjIuMjQ2IDUuMTI4LS40ODYgNi43OS0yLjE1MyAxLjE3LTEuMTQ3IDIuOTA3LTMuNzQ4IDEuNzEtOC4yM3pNMjMxLjc1OCAyMjEuNzNsLTc2LjU2MyA3Ni41NDhjLTEyLjMxMyAxMi4zNC0zMi4zNjMgMTIuMzA0LTQ0LjY3MyAwLTEyLjMxLTEyLjI5OC0xMi4zMS0zMi4zNDIgMC00NC42NThsNzYuNTc0LTc2LjU3YzEyLjMyOC0xMi4zMDMgMzIuMzQyLTEyLjMwMyA0NC42NyAwIDEyLjMwMyAxMi4zMjUgMTIuMzAzIDMyLjM0NS0uMDA3IDQ0LjY4eiIvPjxwYXRoIGQ9Ik0xOTEuNjUgMjE0LjgwNWwtNDMuMzYzIDQzLjM2Yy00LjU4NyA0LjU4OC00LjU4NyAxMi4wNTIgMCAxNi42MjIgMy4zMzMgMy4zNSA4LjIzMyA0LjIzMiAxMi40IDIuNjg0bDUwLjI0LTUwLjI0YzEuNTY2LTQuMTg2LjY4NC05LjA3My0yLjY2Ny0xMi40MjQtNC41NzUtNC41NzYtMTIuMDQ1LTQuNTc2LTE2LjYxIDB6Ii8+PC9zdmc+'
        },
        {
            name: 'Baby',
            path: 'baby',
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMzQuOCIgaGVpZ2h0PSIzMzQuOCIgdmlld0JveD0iMCAwIDMzNC44IDMzNC44Ij48cGF0aCBkPSJNNDIuOCAyMDIuMDIyYzE0LjIzNCAzOS4yNTYgNDcuMjUgNjkuMDI0IDg3LjA2MyA4MC43NDcgNy4wNTMgMTMuNTYgMjEuMjE4IDIyLjg3IDM3LjUzNiAyMi44NyAxNi4zMTQgMCAzMC40OC05LjMxIDM3LjUzLTIyLjg3IDM5LjgxMy0xMS43MjUgNzIuODMtNDEuNSA4Ny4wNjMtODAuNzUgMjMuNjQ2LS4yNzMgNDIuODA1LTE5LjU5NSA0Mi44MDUtNDMuMzA1IDAtMjMuNzEyLTE5LjE1NC00My4wMy00Mi44MDYtNDMuMzAzLTE2LjA1OC00NC4yOTctNTYuMDItNzYuNTczLTEwMi43LTg0LjM4Ni0uNzc1LS4yOTItMS42MDQtLjUxLTIuNTQ3LS41NjItLjU4Ni0uMDMtMS4yMDgtLjAyNi0xLjgwNC0uMDUzLTUuNzczLS43Ny0xMS42MTYtMS4yNTQtMTcuNTQ0LTEuMjU0LTU1Ljc2NyAwLTEwNi4wNzggMzUuMTYtMTI0LjYgODYuMjU1QzE5LjE1MiAxMTUuNjg3IDAgMTM1LjAwNiAwIDE1OC43MThjMCAyMy43MSAxOS4xNTMgNDMuMDMgNDIuOCA0My4zMDV6bTk4LjQ5NiAyNC44MDdjMC00LjYgMTAuNDEyLTExLjU0IDI2LjA5OC0xMS41NCAxNS42OSAwIDI2LjA5OCA2Ljk0IDI2LjA5OCAxMS41NCAwIC43ODMtLjQxIDEuNjUzLTEuMDAyIDIuNTM0LTcuMDM0LTUuMjA1LTE1LjY5My04LjMyNy0yNS4wOTYtOC4zMjctOS40MDIgMC0xOC4wNyAzLjEyMi0yNS4xIDguMzI3LS41OC0uODgtLjk5OC0xLjc0NS0uOTk4LTIuNTM2em0zNC40NjcgNjEuMTE3Yy0yLjYzNy44OTYtNS40MiAxLjQ5Ny04LjM2MyAxLjQ5N3MtNS43MjUtLjYtOC4zNjQtMS40OTdjLTguNDY0LTIuODktMTQuOTgtOS45My0xNy4wMTctMTguNzQyLS40MzgtMS44ODgtLjcyNS0zLjg0LS43MjUtNS44NjQgMC00LjczIDEuMzYtOS4xMSAzLjU3NS0xMi45NCAzLjU0OC02LjE1IDkuNDU3LTEwLjcyIDE2LjU0Ny0xMi40MDIgMS45MjctLjQ1NSAzLjkxNS0uNzU2IDUuOTgyLS43NTZzNC4wNTQuMyA1Ljk4Ljc1NWM3LjA4NSAxLjY3NiAxMi45OSA2LjI1MyAxNi41NCAxMi40MDIgMi4yMSAzLjgyNyAzLjU3NiA4LjIxIDMuNTc2IDEyLjk0IDAgMi4wMjQtLjI4IDMuOTY1LS43MjMgNS44NjMtMi4wMzQgOC44MTItOC41NTIgMTUuODUyLTE3LjAxIDE4Ljc0MnptLTEzMi40Ni0xNTYuMzRjMS4xNyAwIDIuNDQ3LjExIDQuMDEzLjMzNWw2Ljg5NSAxLjAxNiAyLjAzLTYuNjdjOS44NTgtMzIuMyAzNC4wNTUtNTcuOTY0IDY0LjQ3LTcxLjE2Ni02Ljc4NSAxNS4wNCAyLjQzMyAzMy41ODQgMTcuODA1IDQwLjgxMyAxOS4xNTYgOS4wMTMgNTAuMTQ4IDEwLjE4OCA2My4yMTUtOS40MTggNS44OTUtOC44MzQuNjYzLTIwLjAxLTYuNDY2LTI2LjA1NS05Ljk3OC04LjQ2NC0yNC40Ny05LjY2Ni0zNi4zMTYtNC45NjUtOS41OSAzLjgwOC01LjQxNiAxOS40OCA0LjMwOCAxNS42MjMgNy4wNDMtMi43OSAxMy40NTUtMyAyMC4yMTYuNzEgOS4yNyA1LjA5Ni43MjggMTAuOTE3LTUuNzUzIDEyLjc4LTEyLjA4NCAzLjQ3LTI5LjkwOC42MzctMzkuMzUzLTcuODQtMTEuOTIzLTEwLjcwNSAzLjQzNi0yMi44NSAxMi45MzgtMjYuMTc0IDEwLjMwNC0zLjYwOCAyMS42My00LjQwNyAzMi41My00LjAxNSA0NC4wNyA2LjI3IDgxLjc3NCAzNy4yNSA5NC43MjYgNzkuNzA3bDIuMDMgNi42NyA2Ljg5OC0xLjAxN2MxLjU2NS0uMjI3IDIuODMtLjMzNCA0LjAxMy0uMzM0IDE0Ljk0NSAwIDI3LjEwNiAxMi4xNiAyNy4xMDYgMjcuMTA3IDAgMTQuOTQ1LTEyLjE2IDI3LjEwNS0yNy4xMDUgMjcuMTA1LTEuMTggMC0yLjQ0Ni0uMTA1LTMuOTk3LS4zMzJsLTYuOTA4LTEuMDI4LTIuMDM1IDYuNjc2Yy0xMC4zMjUgMzMuODU1LTM2LjQxOCA2MC4zOC02OC44OTMgNzIuOTUzLjAwNS0uMjUyLjAzNi0uNDk1LjAzNi0uNzQyIDAtOC4wMzItMi4yODgtMTUuNTItNi4xOTYtMjEuOTIyIDMuOTE4LTQuMjIgNi4xOTYtOS4xOTIgNi4xOTYtMTQuNTkyIDAtMTUuNTYtMTguNTc4LTI3Ljc0Mi00Mi4yOTgtMjcuNzQyLTIzLjcyMyAwLTQyLjI5OCAxMi4xODMtNDIuMjk4IDI3Ljc0NCAwIDUuNCAyLjI3OCAxMC4zNzMgNi4xOTQgMTQuNTkyLTMuOSA2LjQtNi4xOTMgMTMuODktNi4xOTMgMjEuOTIyIDAgLjI0Ny4wMzIuNDkuMDM3Ljc0My0zMi40OC0xMi41Ny01OC41NjYtMzkuMDk4LTY4Ljg5Mi03Mi45NTNsLTIuMDM2LTYuNjc2LTYuOTA2IDEuMDNjLTEuNTY2LjIyNi0yLjgzNy4zMy00LjAxMy4zMy0xNC45NDcgMC0yNy4xMDItMTIuMTYtMjcuMTAyLTI3LjEwNC4wMDItMTQuOTQ3IDEyLjE1Ny0yNy4xMDggMjcuMTA1LTI3LjEwOHoiLz48cGF0aCBkPSJNMTMzLjE5NiAxNzQuNjljMTMuOTI3IDAgMTMuOTI3LTIxLjYgMC0yMS42cy0xMy45MjcgMjEuNiAwIDIxLjZ6bTY4LjQwMi0xLjM1YzEzLjkyNyAwIDEzLjkyNy0yMS42IDAtMjEuNnMtMTMuOTI3IDIxLjYgMCAyMS42eiIvPjwvc3ZnPg=='
        },
        {
            name: 'Cat',
            path: 'cat',
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMzYuNjIiIGhlaWdodD0iMjM2LjYyIiB2aWV3Qm94PSIwIDAgMjM2LjYyIDIzNi42MiI+PHBhdGggZD0iTTE5Ny4wMjMgMjI1LjU0NWMtMS4xNDUtOS41MzMtMTEuNjgtMTAuNjE0LTE3LjgwNS05Ljk1OC02LjUyLTI0LjU1NCAxNi4yMjUtNjEuMTUgMTcuNTYzLTY5LjgyIDEuNDQtOS4zMTItNi42NTYtNjMuNS03LjUxLTkwLjkzOC0uODgyLTI4LjE3LTQxLjc5LTU5LjI2NC00OC42Mi01NC4zMDctNi43NjggNy40ODQgOS43NDggMTcuNTg1IDEuMDU0IDI2LjI0NS04LjM5OCA4LjM2Ni0xMC41ODggMTMuOTktMTYuODI0IDIzLjQ2LTE1Ljk3NiAyNC4yNTQgMjcuMzE4IDI0LjU1NyAyNy4zMTggMjQuNTU3cy0zMy44ODIgMjUuMTEyLTQxLjQyIDM3Ljc2OGMtNi45NDQgMTEuNjU2LTkuODU1IDI0LjY5Ni0xOC4yMzMgMzUuNjg4LTE5LjA5NCAyNS4wNS0xNC43OSA2OC43My0xNC43OSA2OC43M3MtMzYuMTctMTEuODQtMTYuMjY1LTUzLjEzM2MxNS4xNTMtMzEuNDM0IDIyLjYxNy03Ny44Mi0xMS40NzQtNjUuODktMTMuMTkgNC42MTYgMi45NSAxNC4zMjUgNS43MzQgMTcuNDM1IDkuMzE4IDEwLjQgMS40NCAyNy44OTYtNC4xNzQgMzguMDEyLTE1LjAzNyAyNy4wOS0yMC40OTYgNTUuNDc1IDExLjE1NCA3Mi45NzggMTQuMDYzIDcuNzc2IDMzLjA1NSA5LjcgNTIuMTcgOS45ODJsNDguNjQuMTRjMTYuMDI0Ljc5NyAzNC4xNS0yLjIgMzMuNDgzLTEwLjk1MnoiLz48L3N2Zz4='
        }
    ];

    var activeInstrument = 'piano';
    var sounds = [
        municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/1.mp3',
        municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/2.mp3',
        municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/3.mp3',
        municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/4.mp3',
        municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/5.mp3'
    ];

    /**
     * Constructor
     * Should be named as the class itself
     */
    function Stripe() {
        if ($targetElement.length > 0) {
            $.each(sounds, function (index, item) {
                new Audio(item);
            });

            $targetElement.addClass('easter-egg').append('<ul class="stripe-instruments"></ul>');

            $.each(instruments, function (index, item) {
                $targetElement.find('.stripe-instruments').append('<li><button data-instrument-key="' + index + '"><img src="' + item.icon + '"><span>' + item.name + '</span></button></li>');
            });
        }

        $targetElement.find('div').on('click', function (e) {
            var soundIndex = $(e.target).closest('div').index();
            this.play(soundIndex);
            this.playLog(soundIndex);
        }.bind(this));

        $(document).on('click', '.hero .stripe .stripe-instruments button',  function (e) {
            var $btn = $(e.target).closest('button');

            $targetElement.find('.stripe-instruments button.active').removeClass('active');
            $btn.addClass('active');

            var instrumentKey = $btn.attr('data-instrument-key');
            this.setInstrument(instrumentKey);
        }.bind(this));
    }

    Stripe.prototype.setInstrument = function(instrumentKey) {
        $targetElement.find('.stripe-instruments button.active').removeClass('active');
        $targetElement.find('.stripe-instruments button[data-instrument-key="' + instrumentKey + '"]').addClass('active');

        activeInstrument = instruments[instrumentKey].path;
        sounds = [
            municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/1.mp3',
            municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/2.mp3',
            municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/3.mp3',
            municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/4.mp3',
            municipioIntranet.themeUrl + '/assets/sound/' + activeInstrument + '/5.mp3'
        ];
    };

    /**
     * Play sound at index
     * @param  {integer} soundIndex Sound index
     * @return {void}
     */
    Stripe.prototype.play = function(soundIndex) {
        if (!(soundIndex in sounds)) {
            return;
        }

        var audio = new Audio(sounds[soundIndex]);

        audio.play();

        audio.addEventListener('ended', function () {
            this.remove();
        });
    };

    /**
     * Log strokes in the playLog
     * @param  {integer} soundIndex Sound index
     * @return {mixed}
     */
    Stripe.prototype.playLog = function(soundIndex) {
        if (magicHappend === true) {
            return;
        }

        playLog.push(soundIndex);
        var lastFour = playLog.slice(Math.max(playLog.length - magicCode.length, 0));

        if (lastFour.join('') != magicCode.join('')) {
            return;
        }

        $targetElement.find('.stripe-instruments').addClass('show');
        this.setInstrument(0);
        magicHappend = true;

        $(document).on('keypress', function (e) {
            switch (e.which) {
                case 49:
                    this.play(0);
                    break;

                case 50:
                    this.play(1);
                    break;

                case 51:
                    this.play(2);
                    break;

                case 52:
                    this.play(3);
                    break;

                case 53:
                    this.play(4);
                    break;
            }
        }.bind(this));
    };

    return new Stripe();

})(jQuery);
