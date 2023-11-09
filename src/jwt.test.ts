import { importJWK, jwtVerify, KeyLike } from "jose";

const JWT_VC =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIseyJAdm9jYWIiOiJodHRwOi8vc2NoZW1hLmd0aS5lbmVyZ3kvIn1dLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Ik10cmVwb3J0Ijp7IlpOdW1iZXIiOiJBUEkgRGVjaXNpb24gTmVlZGVkIiwiUGlwZU51bWJlciI6IkFQSSBEZWNpc2lvbiBOZWVkZWQiLCJTZXJpYWxOdW1iZXIiOlsiTG9yZW0iLCJMb3JlbSJdLCJIZWF0TnVtYmVyIjoiMjMyNzk2IiwiTXRyTnVtYmVySWRlbnRpZmllciI6IjE1NTYiLCJEYXRlT2ZDZXJ0aWZpY2F0aW9uIjoiMjAyMC0wMy0wM1QxNTowNjoyMS41OTVaIiwiSW5zcGVjdGlvbkRvY3VtZW50U3BlY2lmaWNhdGlvbiI6IiBJU08gMTA0NzQgOjE5OTEvRU4gMTAyMDQgOjIwMDQiLCJSZXBvcnRUeXBlIjoiMy4xIiwiU3RlZWxTdXBwbGllck5hbWUiOiJBcmNlbG9yIC0gTWl0dGFsIFN0ZWVsIChJLkguIFdlc3QpICwgQU0vTlMtIENhbHZlcnQgKFJvbGwpICIsIlN0ZWVsU3VwcGxpZXJBZGRyZXNzIjoiMzIxMCBXYXRsaW5nIFN0LiAvIEVhc3QgQ2hpY2FnbywgSU4gNDYzMTIgMSBBTS9OUyBXYXkgLyBDYWx2ZXJ0LCBBTCAzNjUxMyAiLCJNZWx0aW5nVmVuZG9yIjoiKEcpIENsZXZlbGFuZCBDbGlmZnMsIEluZGlhbmEgSGFyYm9yIiwiTWVsdGluZ1ZlbmRvckFkZHJlc3MiOiIzMjEwIFdhdGxpbmcgU3RyZWV0IEVhc3QgQ2hpY2FnbywgSU4gNDYzMTIgVVNBIiwiUHJvZHVjZXJOYW1lIjoiQW1lcmljYW4gQ2FzdCBJcm9uIFBpcGUgQ28iLCJQcm9kdWNlckFkZHJlc3MiOiIxNTAxIDMxc3QgQXZlbnVlIE5vcnRoLCBCaXJtaW5naGFtLCBBTCAzNTIwNyIsIkNlcnRpZmljYXRlUGlwZU1hbnVmYWN0dXJlcuKAmXNGYWNpbGl0eSI6IjVMLTAxMjYiLCJDdXN0b21lck5hbWUiOiJNUkMgR0xPQkFMIElOQyIsIkN1c3RvbWVyQWRkcmVzcyI6IkFDQ09VTlRTIFBBWUFCTEUgUE8gQk9YIDUxMyBDSEFSTEVTVE9OLCBXViAgMjUzMjIiLCJDdXN0b21lck9yZGVyIjoiUyA3QTcgNTIxNzQ2ICIsIlNwZWNpYWxOb3RlcyI6IkhBUkRORVNTIElTIDIyIEhSQyBNQVguICBUSElTIE9SREVSIFdJTEwgQUxTTyBNRUVUIEFTVE0gQTUzIEdSQURFIEJBTkQgQVNNRSBTQSA1MyBHUkFERSBCLiAgUElQRSBXRVJFIE1BTlVGQUNUVVJFRCBJTiBBQ0NPUkRBTkNFIFdJVEggTVJDICdTVEFOREFSRCBGT1IgUFVSQ0hBU0UgT0YgTElORSBQSVBFIEZPUiBNUkMgR0xPQkFMIElOVkVOVE9SWScgRE9DVU1FTlQgTlVNQkVSIFNURC1MUE9sIFJFViA2LCAgUkVWLiBEQVRFIDExIDIwMjAtMDktMjMgMTEg4oCiICBORFQgdGVzdGVkIHVzaW5nIGFuIFVsdHJhc29uaWMgdGVzdCBtZXRob2QgY2FsaWJyYXRlZCBJRCAmIE9EIE4tMTAgTk9UQ0hFUy4gSHlkcm9zdGF0aWMgdGVzdCBkdXJhdGlvbiAxMCBzZWNvbmRzLiBNYXggYWxsb3dhYmxlIEMuRS4gUENNIC4yNS4gIE1pbmltdW0gd2VsZCBzZWFtIGFubmVhbCB0ZW1wZXJhdHVyZSAxNiAwMCBkZWdyZWVzIEYgZm9yIGFsbCBwaXBlLiAgQ2hhcnB5IGFjY2VwdGFuY2UgY3JpdGVyaWEgTWluLiBFbmVyZ3kgMTUvSGVhdC4gTWluLiBzaGVhciBhcmVhIDg1L0hlYXQuIiwiVGVzdENvbW1lbnRzIjoiQWxsIHRlc3RzIGFyZSBmcm9tIHRoZSBib2R5IG9mIHRoZSBwaXBlIGluIHRoZSB0cmFuc3ZlcnNlIGRpcmVjdGlvbiB1bmxlc3Mgb3RoZXJ3aXNlIG5vdGVkLiBTdGFuZGFyZCBmbGF0IHRlbnNpbGUgZ2FnZSBsZW5ndGggMS0xLzInIHggMicuICBQaXBlIGJvZHkgdGVzdCBsb2NhdGlvbjogVGVuc2lsZSAxODA7IENWTiBUOTAuICAgIENvaWxzIHVzZWQgZm9yIHRoaXMgb3JkZXIgd2VyZSBtZWx0ZWQgYW5kIG1hbnVmYWN0dXJlZCBpbiB0aGUgVVNBLiAgICAgV2UgaGVyZWJ5IGNlcnRpZnkgdGhhdCB0aGUgYWJvdmUgZmlndXJlcyBhcmUgY29ycmVjdCBhcyBjb250YWluZWQgaW4gdGhlIHJlY29yZHMgb2YgdGhpcyBjb21wYW55LCBhbmQgdGhhdCB0aGUgcGlwZSB3ZXJlIG1hbnVmYWN0dXJlZCwgdGVzdGVkLCBhbmQgaW5zcGVjdGVkIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGF0ZXN0IGVkaXRpb24gb2YgdGhlIGFwcGxpY2FibGUgIFNwZWNpZmljYXRpb24gYXQgQW1lcmljYW4gU3RlZWwgUGlwZSAoQVNQKSBsb2NhdGVkIGF0IDE1MDAgMzJuZCBBdmVudWUgTm9ydGgsIEJpcm1pbmdoYW0sIEFMIDM1MjA3IChVU0EpLiAiLCJQaXBlRGVzY3JpcHRpb24iOnsiU3BlY2lmaWNhdGlvbnMiOiJBUEkgNUwiLCJBcGk1bEVkaXRpb25OdW1iZXIiOiI0NSAtIDcvMS8yMDEzLCA0NiAtIDUvMS8yMDE5IiwiUGlwZU5vbWluYWxPdXRzaWRlRGlhbWV0ZXIiOjIwLCJQaXBlTm9taW5hbE91dHNpZGVEaWFtZXRlclVuaXRzIjoiaW4iLCJQaXBlTm9taW5hbFdhbGxUaGlja25lc3MiOjAuMzc1LCJQaXBlTm9taW5hbFdhbGxUaGlja25lc3NVbml0cyI6ImluIiwiUGlwZUdyYWRlIjoiWDUyTSIsIlByb2R1Y3RTcGVjaWZpY2F0aW9uTGV2ZWwiOiIyIiwiUGlwZVR5cGUiOiJIRlciLCJQaXBlQWRkaXRpb25hbERlc2NyaXB0aW9uIjoiQVBJIExpbmUgUGlwZSJ9LCJBbm5leEFwcGxpY2FiaWxpdHkiOnsiQW5uZXhGIjpmYWxzZSwiQW5uZXhHIjpmYWxzZSwiQW5uZXhJIjpmYWxzZSwiQW5uZXhNIjpmYWxzZSwiQW5uZXhPIjpmYWxzZX0sIkNoZW1pY2FsbW9kZWwiOnsiQ2hlbWlzdHJ5bW9kZWxoIjp7IlNhbXBsZXNvdXJjZSI6IkNvaWwiLCJTYW1wbGVpZCI6IjExLzIzIiwiQ2hlbWlzdHJ5dGVzdHN0YXR1c3R5cGVjIjoiSU5JVCIsIkNjYXJib24iOjAuMDY0LCJNbm1hbmdhbmVzZSI6MC43NzEsIlBwaG9zcGhvcnVzIjotNSwiU3N1bGZ1ciI6MC4wMDIsIk5ibmlvYml1bSI6MC4wNDMsIlNpc2lsaWNvbiI6MC4wNjksIlRpdGl0YW5pdW0iOjAuMDAxLCJDdWNvcHBlciI6MC4wMDksIk5pbmlja2VsIjowLjAwNSwiTW9tb2x5YmRlbnVtIjowLjAwMiwiQ3JjaHJvbWl1bSI6MC4wMjEsIlZ2YW5hZGl1bSI6MC4wMDEsIkFsYWx1bWludW0iOjAuMDQ5LCJCYm9yb24iOjAuMDAwMSwiTm5pdHJvZ2VuIjowLjAwNjQsIkNhY2FsY2l1bSI6MC4wMDE2LCJDZXBjbWNhcmJvbiI6MC4xMDcsIkNlcGNtYWNjZXB0YW5jZWNyaXRlcmlhIjowLjI1LCJDZWlpd2NhcmJvbmVxdWl2YWxlbnQiOjAsIkNlaWl3YWNjZXB0YW5jZWNyaXRlcmlhIjowLjI1fSwiQ2hlbWlzdHJ5bW9kZWxwMSI6eyJTYW1wbGVzb3VyY2UiOiJQaXBlIiwiU2FtcGxlaWQiOiIwMDU4IiwiQ2hlbWlzdHJ5dGVzdHN0YXR1c3R5cGVjIjoiSU5JVCIsIkNjYXJib24iOjAuMDc5LCJNbm1hbmdhbmVzZSI6MC43NTcsIlBwaG9zcGhvcnVzIjowLjAwOCwiU3N1bGZ1ciI6MC4wMDQsIk5ibmlvYml1bSI6MC4wNTIsIlNpc2lsaWNvbiI6MC4wOSwiVGl0aXRhbml1bSI6MC4wMDEsIkN1Y29wcGVyIjowLjAxNCwiTmluaWNrZWwiOjAuMDM1LCJNb21vbHliZGVudW0iOjAuMDA3LCJDcmNocm9taXVtIjowLjAyNiwiVnZhbmFkaXVtIjowLjAwMiwiQWxhbHVtaW51bSI6MC4wNTEsIkJib3JvbiI6MCwiTm5pdHJvZ2VuIjowLjAwNjIsIkNhY2FsY2l1bSI6MC4wMDMzLCJDZXBjbWNhcmJvbiI6MC4xMjMsIkNlcGNtYWNjZXB0YW5jZWNyaXRlcmlhIjowLjI1LCJDZWlpd2NhcmJvbmVxdWl2YWxlbnQiOjAsIkNlaWl3YWNjZXB0YW5jZWNyaXRlcmlhIjowLjI1fSwiQ2hlbWlzdHJ5bW9kZWxwMiI6eyJTYW1wbGVzb3VyY2UiOiJQaXBlIiwiU2FtcGxlaWQiOiIwMDYxIiwiQ2hlbWlzdHJ5dGVzdHN0YXR1c3R5cGVjIjoiSU5JVCIsIkNjYXJib24iOjAuMDcyLCJNbm1hbmdhbmVzZSI6MC43NjYsIlBwaG9zcGhvcnVzIjowLjAxLCJTc3VsZnVyIjowLjAwNCwiTmJuaW9iaXVtIjowLjA1LCJTaXNpbGljb24iOjAuMTAzLCJUaXRpdGFuaXVtIjowLjAwMiwiQ3Vjb3BwZXIiOjAuMDE1LCJOaW5pY2tlbCI6MC4wMzUsIk1vbW9seWJkZW51bSI6MC4wMDcsIkNyY2hyb21pdW0iOjAuMDMxLCJWdmFuYWRpdW0iOjAuMDAzLCJBbGFsdW1pbnVtIjowLjAzMSwiQmJvcm9uIjowLCJObml0cm9nZW4iOjAuMDA1MiwiQ2FjYWxjaXVtIjowLjAwMzMsIkNlcGNtY2FyYm9uIjowLjExNywiQ2VwY21hY2NlcHRhbmNlY3JpdGVyaWEiOjAuMjUsIkNlaWl3Y2FyYm9uZXF1aXZhbGVudCI6MCwiQ2VpaXdhY2NlcHRhbmNlY3JpdGVyaWEiOjAuMjV9fSwiTWVjaGFuaWNhbG1vZGVsMSI6eyJTYW1wbGVzb3VyY2UiOiJQaXBlIiwiU2FtcGxlaWQiOiIwMDU4IiwiVGVuc2lsZXRlc3RzIjp7IlRlc3RTdGF0dXMiOiJJTklUIiwiVGVzdExvY2F0aW9uIjoiQm9keSIsIlRlc3RPcmllbnRhdGlvbiI6IlRyYW5zdmVyc2UiLCJUZXN0U3BlY2ltZW5UeXBlIjoiZnVsbCBzZWN0aW9uIiwiVGVzdFNwZWNpZmljYXRpb24iOiJBU1RNIEEzNzAiLCJUZXN0U3BlY2ltZW5TaXplIjoiMS0xLzIgaW4gWCAyIGluIiwiVGVuc2lsZVRlc3RZaWVsZE1lYXN1cmVtZW50UG9pbnQiOiJMb3JlbSIsIlRlc3R0ZW5zaWxlc3RyZW5ndGh3ZWxkIjo3Mi4xLCJUZXN0dGVuc2lsZXN0cmVuZ3RodW5pdHMiOiJrc2kiLCJUZXN0dGVuc2lsZXN0cmVuZ3RocGlwZWJvZHkiOjc3LjgsIlRlc3R0ZW5zaWxlc3RyZW5ndGhwaXBlYm9keXVuaXRzIjoia3NpIiwiVGVzdFlpZWxkU3RyZW5ndGgiOjYxLjcsIlRlbnNpbGVUZXN0WWllbGRTdHJlbmd0aFVuaXRzIjoia3NpIiwiVGVzdFRvdGFsJUVsb25nYXRpb25BdEZyYWN0dXJlIjozMi41LCJUZXN0WWllbGRUb1RlbnNpbGVSYXRpbyI6MC43OSwiVGVuc2lsZVNwZWNpbWVuR2FnZUxlbmd0aCI6MiwiVGVuc2lsZXNwZWNpbWVuZ2FnZWxlbmd0aHVuaXRzIjoiaW4ifSwiQmVuZHRlc3RzIjp7IkJlbmR0ZXN0c3BlY2lmaWNhdGlvbiI6IkxvcmVtIiwiUHJvY2Vzc2JlbmR0ZXN0cGFzc2ZhaWwiOnRydWV9LCJQcm9jZXNzZmxhdHRlbmluZ3Rlc3RzIjp0cnVlLCJQcm9jZXNzZ3VpZGVkYmVuZHRlc3QiOnRydWUsIkRlYWR3ZWlnaHR0ZXN0Ijp7IkR3dHR0ZXN0cGlwZW51bWJlciI6IkxvcmVtIiwiRHd0dHRlc3RzdGF0dXN0eXBlIjoiTG9yZW0iLCJEd3R0c3RhbmRhcmR1c2VkIjoiTG9yZW0iLCJEd3R0c3BlY2ltZW5zaXplIjoiTG9yZW0iLCJEd3R0bm90Y2h0eXBlIjoiTG9yZW0iLCJEd3R0dGVzdHRlbXBlcmF0dXJlIjoiTG9yZW0iLCJEd3R0dGVzdHRlbXBlcmF0dXJldW5pdHMiOiJMb3JlbSIsIkR3dHRzaGVhcmFyZWExJSI6OTEsIkR3dHRzaGVhcmFyZWEyJSI6LTczLCJEd3R0YXZlcmFnZXNoZWFyYXJlYSUiOjk2fSwiSGFyZG5lc3MiOnsiSGFyZG5lc3N0ZXN0c3RhdHVzdHlwZSI6IkhSQiIsIkhhcmRuZXNzdGVzdHNwZWNpZmljYXRpb24iOiJMb3JlbSIsIk1heGhhcmRuZXNzcmVjb3JkZWRib2R5Ijo5MCwiTWF4aGFyZG5lc3NyZWNvcmRlZGhheiI6MCwiTWF4aGFyZG5lc3NyZWNvcmRlZHdlbGQiOjAsIkhhcmRuZXNzdGVzdHVuaXRzIjoia2dmIn0sIkh5ZHJvc3RhdGljdGVzdCI6eyJIeWRyb3N0YXRpY3Rlc3RyZXN1bHQiOnRydWUsIlNwZWNpZmllZG1pbmltdW1oeWRyb3N0YXRpY3Rlc3RwcmVzc3VyZXZhbHVlIjoxOTYwLCJUZXN0cHJlc3N1cmV1bml0cyI6InBzaSIsIlNwZWNpZmllZG1pbmltdW1oeWRyb3N0YXRpY3Rlc3RwcmVzc3VyZWR1cmF0aW9uIjoxMCwiVGVzdGR1cmF0aW9udW5pdHMiOiJTZWMifSwiTmR0c3RhdGVtZW50IjoiTkRUIHRlc3RlZCB1c2luZyBhbiBVbHRyYXNvbmljIHRlc3QgbWV0aG9kIGNhbGlicmF0ZWQgSUQgJiBPRCBOLTEwIE5PVENIRVMifSwiTWVjaGFuaWNhbG1vZGVsMiI6eyJTYW1wbGVzb3VyY2UiOiJDb2lsIiwiU2FtcGxlaWQiOiIwMDYxIiwiVGVuc2lsZXRlc3RzIjp7IlRlc3RTdGF0dXMiOiJJTklUIiwiVGVzdExvY2F0aW9uIjoiQm9keSIsIlRlc3RPcmllbnRhdGlvbiI6IlRyYW5zdmVyc2UiLCJUZXN0U3BlY2ltZW5UeXBlIjoiZnVsbCBzZWN0aW9uIiwiVGVzdFNwZWNpZmljYXRpb24iOiJBU1RNIEEzNzAiLCJUZXN0U3BlY2ltZW5TaXplIjoiMS0xLzIgaW4gWCAyIGluIiwiVGVuc2lsZVRlc3RZaWVsZE1lYXN1cmVtZW50UG9pbnQiOiJMb3JlbSIsIlRlc3R0ZW5zaWxlc3RyZW5ndGh3ZWxkIjo3Mi40LCJUZXN0dGVuc2lsZXN0cmVuZ3RodW5pdHMiOiJrc2kiLCJUZXN0dGVuc2lsZXN0cmVuZ3RocGlwZWJvZHkiOjc2LjksIlRlc3R0ZW5zaWxlc3RyZW5ndGhwaXBlYm9keXVuaXRzIjoia3NpIiwiVGVzdFlpZWxkU3RyZW5ndGgiOjYyLjEsIlRlbnNpbGVUZXN0WWllbGRTdHJlbmd0aFVuaXRzIjoia3NpIiwiVGVzdFRvdGFsJUVsb25nYXRpb25BdEZyYWN0dXJlIjozOS41LCJUZXN0WWllbGRUb1RlbnNpbGVSYXRpbyI6MC44MSwiVGVuc2lsZVNwZWNpbWVuR2FnZUxlbmd0aCI6MiwiVGVuc2lsZXNwZWNpbWVuZ2FnZWxlbmd0aHVuaXRzIjoiaW4ifSwiQmVuZHRlc3RzIjp7IkJlbmR0ZXN0c3BlY2lmaWNhdGlvbiI6IkxvcmVtIiwiUHJvY2Vzc2JlbmR0ZXN0cGFzc2ZhaWwiOnRydWV9LCJQcm9jZXNzZmxhdHRlbmluZ3Rlc3RzIjp0cnVlLCJQcm9jZXNzZ3VpZGVkYmVuZHRlc3QiOnRydWUsIkRlYWR3ZWlnaHR0ZXN0Ijp7IkR3dHR0ZXN0cGlwZW51bWJlciI6IkxvcmVtIiwiRHd0dHRlc3RzdGF0dXN0eXBlIjoiTG9yZW0iLCJEd3R0c3RhbmRhcmR1c2VkIjoiTG9yZW0iLCJEd3R0c3BlY2ltZW5zaXplIjoiTG9yZW0iLCJEd3R0bm90Y2h0eXBlIjoiTG9yZW0iLCJEd3R0dGVzdHRlbXBlcmF0dXJlIjoiTG9yZW0iLCJEd3R0dGVzdHRlbXBlcmF0dXJldW5pdHMiOiJMb3JlbSIsIkR3dHRzaGVhcmFyZWExJSI6LTQyLCJEd3R0c2hlYXJhcmVhMiUiOi02NCwiRHd0dGF2ZXJhZ2VzaGVhcmFyZWElIjoxMX0sIkhhcmRuZXNzIjp7IkhhcmRuZXNzdGVzdHN0YXR1c3R5cGUiOiJIUkIiLCJIYXJkbmVzc3Rlc3RzcGVjaWZpY2F0aW9uIjoiTG9yZW0iLCJNYXhoYXJkbmVzc3JlY29yZGVkYm9keSI6ODYsIk1heGhhcmRuZXNzcmVjb3JkZWRoYXoiOjAsIk1heGhhcmRuZXNzcmVjb3JkZWR3ZWxkIjowLCJIYXJkbmVzc3Rlc3R1bml0cyI6ImtnZiJ9LCJIeWRyb3N0YXRpY3Rlc3QiOnsiSHlkcm9zdGF0aWN0ZXN0cmVzdWx0Ijp0cnVlLCJTcGVjaWZpZWRtaW5pbXVtaHlkcm9zdGF0aWN0ZXN0cHJlc3N1cmV2YWx1ZSI6MTk2MCwiVGVzdHByZXNzdXJldW5pdHMiOiJwc2kiLCJTcGVjaWZpZWRtaW5pbXVtaHlkcm9zdGF0aWN0ZXN0cHJlc3N1cmVkdXJhdGlvbiI6MTAsIlRlc3RkdXJhdGlvbnVuaXRzIjoic2VjIn0sIk5kdHN0YXRlbWVudCI6Ik5EVCB0ZXN0ZWQgdXNpbmcgYW4gVWx0cmFzb25pYyB0ZXN0IG1ldGhvZCBjYWxpYnJhdGVkIElEICYgT0QgTi0xMCBOT1RDSEVTIn0sIlByb2Nlc3NDb250cm9scyI6eyJNaW5pbXVtVGVtcGVyYXR1cmVGb3JIZWF0VHJlYXRtZW50LFdlbGRTZWFtSGZ3T25seSI6MTYwMCwiTWluaW11bVRlbXBlcmF0dXJlVW5pdHNGb3JIZWF0VHJlYXRtZW50LFdlbGRTZWFtKGhmd09ubHkpIjoiRiJ9LCJDaGFycHlwcm9kdWN0aW9uIjp7IkNoYXJweXZub3RjaDEiOnsiQ3ZuVGVzdFN0YXR1cy10eXBlIjoiSU5UIiwiQ3ZuVGVzdExvY2F0aW9uIjoiQm9keSIsIkN2blRlc3RTcGVjaWZpY2F0aW9uIjoiQVNUTSBBMzcwIiwiQ3ZuVGVzdFNwZWNpbWVuU2l6ZSI6MC43NSwiQ3ZuVGVzdE9yaWVudGF0aW9uIjoiVDkwIiwiQ3ZuVGVzdFRlbXBlcmF0dXJlIjotMjAsIkN2blRlc3RUZW1wZXJhdHVyZVVuaXRzIjoiRiIsIkN2bkFic29yYmVkRW5lcmd5MSI6MTExLCJDdm5BYnNvcmJlZEVuZXJneTIiOjkyLCJDdm5BYnNvcmJlZEVuZXJneTMiOjExMiwiQ3ZuQXZlcmFnZUFic29yYmVkRW5lcmd5IjoxMDUsIkN2bkFic29yYmVkRW5lcmd5VW5pdHMiOiJGdC1sYmYiLCJDdm5BYnNvcmJlZEVuZXJneUFjY2VwdGFuY2VDcml0ZXJpYUZvclNwZWNpbWVuU2l6ZVVzZWQiOiIyNSIsIkN2blNoZWFyQXJlYTEoJSkiOjEwMCwiQ3ZuU2hlYXJBcmVhMiglKSI6MTAwLCJDdm5TaGVhckFyZWEzKCUpIjoxMDAsIkN2bkF2ZXJhZ2VTaGVhckFyZWEoJSkiOjEwMCwiQ3ZuU2hlYXJBcmVhQWNjZXB0YW5jZUNyaXRlcmlhRm9yU3BlY2ltZW5TaXplVXNlZCI6ODV9LCJDaGFycHl2bm90Y2gyIjp7IkN2blRlc3RTdGF0dXMtdHlwZSI6IklOVCIsIkN2blRlc3RMb2NhdGlvbiI6IkJvZHkiLCJDdm5UZXN0U3BlY2lmaWNhdGlvbiI6IkFTVE0gQTM3MCIsIkN2blRlc3RTcGVjaW1lblNpemUiOjAuNzUsIkN2blRlc3RPcmllbnRhdGlvbiI6IlQ5MCIsIkN2blRlc3RUZW1wZXJhdHVyZSI6LTIwLCJDdm5UZXN0VGVtcGVyYXR1cmVVbml0cyI6IkYiLCJDdm5BYnNvcmJlZEVuZXJneTEiOjE1MSwiQ3ZuQWJzb3JiZWRFbmVyZ3kyIjoxMzYsIkN2bkFic29yYmVkRW5lcmd5MyI6MTAzLCJDdm5BdmVyYWdlQWJzb3JiZWRFbmVyZ3kiOjEzMCwiQ3ZuQWJzb3JiZWRFbmVyZ3lVbml0cyI6IkZ0LWxiZiIsIkN2bkFic29yYmVkRW5lcmd5QWNjZXB0YW5jZUNyaXRlcmlhRm9yU3BlY2ltZW5TaXplVXNlZCI6IjE1IiwiQ3ZuU2hlYXJBcmVhMSglKSI6MTAwLCJDdm5TaGVhckFyZWEyKCUpIjoxMDAsIkN2blNoZWFyQXJlYTMoJSkiOjEwMCwiQ3ZuQXZlcmFnZVNoZWFyQXJlYSglKSI6MTAwLCJDdm5TaGVhckFyZWFBY2NlcHRhbmNlQ3JpdGVyaWFGb3JTcGVjaW1lblNpemVVc2VkIjo4NX19LCJDaGFycHlleHRyYSI6eyJDaGFycHl2bm90Y2gxIjp7IkN2blRlc3RTdGF0dXMtdHlwZSI6IklOVCIsIkN2blRlc3RMb2NhdGlvbiI6IldlbGQgTGluZSIsIkN2blRlc3RTcGVjaWZpY2F0aW9uIjoiQVNUTSBBMzcwIiwiQ3ZuVGVzdFNwZWNpbWVuU2l6ZSI6MC43NSwiQ3ZuVGVzdE9yaWVudGF0aW9uIjoiVDkwIiwiQ3ZuVGVzdFRlbXBlcmF0dXJlIjotMjAsIkN2blRlc3RUZW1wZXJhdHVyZVVuaXRzIjoiRiIsIkN2bkFic29yYmVkRW5lcmd5MSI6MTk0LCJDdm5BYnNvcmJlZEVuZXJneTIiOjE5NCwiQ3ZuQWJzb3JiZWRFbmVyZ3kzIjoxNjQsIkN2bkF2ZXJhZ2VBYnNvcmJlZEVuZXJneSI6MTg0LCJDdm5BYnNvcmJlZEVuZXJneVVuaXRzIjoiRnQtbGJmIiwiQ3ZuQWJzb3JiZWRFbmVyZ3lBY2NlcHRhbmNlQ3JpdGVyaWFGb3JTcGVjaW1lblNpemVVc2VkIjoiMjUiLCJDdm5TaGVhckFyZWExKCUpIjoxMDAsIkN2blNoZWFyQXJlYTIoJSkiOjEwMCwiQ3ZuU2hlYXJBcmVhMyglKSI6MTAwLCJDdm5BdmVyYWdlU2hlYXJBcmVhKCUpIjoxMDAsIkN2blNoZWFyQXJlYUFjY2VwdGFuY2VDcml0ZXJpYUZvclNwZWNpbWVuU2l6ZVVzZWQiOjg1fSwiQ2hhcnB5dm5vdGNoMiI6eyJDdm5UZXN0U3RhdHVzLXR5cGUiOiJJTlQiLCJDdm5UZXN0TG9jYXRpb24iOiJIQVoiLCJDdm5UZXN0U3BlY2lmaWNhdGlvbiI6IkFTVE0gQTM3MCIsIkN2blRlc3RTcGVjaW1lblNpemUiOjAuNzUsIkN2blRlc3RPcmllbnRhdGlvbiI6IlQ5MCIsIkN2blRlc3RUZW1wZXJhdHVyZSI6LTIwLCJDdm5UZXN0VGVtcGVyYXR1cmVVbml0cyI6IkYiLCJDdm5BYnNvcmJlZEVuZXJneTEiOjE5NiwiQ3ZuQWJzb3JiZWRFbmVyZ3kyIjoxODIsIkN2bkFic29yYmVkRW5lcmd5MyI6MTg3LCJDdm5BdmVyYWdlQWJzb3JiZWRFbmVyZ3kiOjE4MiwiQ3ZuQWJzb3JiZWRFbmVyZ3lVbml0cyI6IkZ0LWxiZiIsIkN2bkFic29yYmVkRW5lcmd5QWNjZXB0YW5jZUNyaXRlcmlhRm9yU3BlY2ltZW5TaXplVXNlZCI6IjE1IiwiQ3ZuU2hlYXJBcmVhMSglKSI6MTAwLCJDdm5TaGVhckFyZWEyKCUpIjoxMDAsIkN2blNoZWFyQXJlYTMoJSkiOjEwMCwiQ3ZuQXZlcmFnZVNoZWFyQXJlYSglKSI6MTAwLCJDdm5TaGVhckFyZWFBY2NlcHRhbmNlQ3JpdGVyaWFGb3JTcGVjaW1lblNpemVVc2VkIjo4NX0sIkNoYXJweXZub3RjaDMiOnsiQ3ZuVGVzdFN0YXR1cy10eXBlIjoiSU5UIiwiQ3ZuVGVzdExvY2F0aW9uIjoiV2VsZCBMaW5lIiwiQ3ZuVGVzdFNwZWNpZmljYXRpb24iOiJBU1RNIEEzNzAiLCJDdm5UZXN0U3BlY2ltZW5TaXplIjowLjc1LCJDdm5UZXN0T3JpZW50YXRpb24iOiJUOTAiLCJDdm5UZXN0VGVtcGVyYXR1cmUiOi0yMCwiQ3ZuVGVzdFRlbXBlcmF0dXJlVW5pdHMiOiJGIiwiQ3ZuQWJzb3JiZWRFbmVyZ3kxIjoxOTQsIkN2bkFic29yYmVkRW5lcmd5MiI6MTk3LCJDdm5BYnNvcmJlZEVuZXJneTMiOjE3OSwiQ3ZuQXZlcmFnZUFic29yYmVkRW5lcmd5IjoxOTAsIkN2bkFic29yYmVkRW5lcmd5VW5pdHMiOiJGdC1sYmYiLCJDdm5BYnNvcmJlZEVuZXJneUFjY2VwdGFuY2VDcml0ZXJpYUZvclNwZWNpbWVuU2l6ZVVzZWQiOiIxNSIsIkN2blNoZWFyQXJlYTEoJSkiOjEwMCwiQ3ZuU2hlYXJBcmVhMiglKSI6MTAwLCJDdm5TaGVhckFyZWEzKCUpIjoxMDAsIkN2bkF2ZXJhZ2VTaGVhckFyZWEoJSkiOjEwMCwiQ3ZuU2hlYXJBcmVhQWNjZXB0YW5jZUNyaXRlcmlhRm9yU3BlY2ltZW5TaXplVXNlZCI6ODV9LCJDaGFycHl2bm90Y2g0Ijp7IkN2blRlc3RTdGF0dXMtdHlwZSI6IklOVCIsIkN2blRlc3RMb2NhdGlvbiI6IkhBWiIsIkN2blRlc3RTcGVjaWZpY2F0aW9uIjoiQVNUTSBBMzcwIiwiQ3ZuVGVzdFNwZWNpbWVuU2l6ZSI6MC43NSwiQ3ZuVGVzdE9yaWVudGF0aW9uIjoiVDkwIiwiQ3ZuVGVzdFRlbXBlcmF0dXJlIjotMjAsIkN2blRlc3RUZW1wZXJhdHVyZVVuaXRzIjoiRiIsIkN2bkFic29yYmVkRW5lcmd5MSI6MTkxLCJDdm5BYnNvcmJlZEVuZXJneTIiOjE5NSwiQ3ZuQWJzb3JiZWRFbmVyZ3kzIjoxOTAsIkN2bkF2ZXJhZ2VBYnNvcmJlZEVuZXJneSI6MTkyLCJDdm5BYnNvcmJlZEVuZXJneVVuaXRzIjoiRnQtbGJmIiwiQ3ZuQWJzb3JiZWRFbmVyZ3lBY2NlcHRhbmNlQ3JpdGVyaWFGb3JTcGVjaW1lblNpemVVc2VkIjoiMjUiLCJDdm5TaGVhckFyZWExKCUpIjoxMDAsIkN2blNoZWFyQXJlYTIoJSkiOjEwMCwiQ3ZuU2hlYXJBcmVhMyglKSI6MTAwLCJDdm5BdmVyYWdlU2hlYXJBcmVhKCUpIjoxMDAsIkN2blNoZWFyQXJlYUFjY2VwdGFuY2VDcml0ZXJpYUZvclNwZWNpbWVuU2l6ZVVzZWQiOjg1fSwiQ2hhcnB5dm5vdGNoNSI6eyJDdm5UZXN0U3RhdHVzLXR5cGUiOiIiLCJDdm5UZXN0TG9jYXRpb24iOiIiLCJDdm5UZXN0U3BlY2lmaWNhdGlvbiI6IkFTVE0gQTM3MCIsIkN2blRlc3RTcGVjaW1lblNpemUiOjAuNzUsIkN2blRlc3RPcmllbnRhdGlvbiI6IlQ5MCIsIkN2blRlc3RUZW1wZXJhdHVyZSI6MzIsIkN2blRlc3RUZW1wZXJhdHVyZVVuaXRzIjoiRiIsIkN2bkFic29yYmVkRW5lcmd5MSI6MCwiQ3ZuQWJzb3JiZWRFbmVyZ3kyIjowLCJDdm5BYnNvcmJlZEVuZXJneTMiOjAsIkN2bkF2ZXJhZ2VBYnNvcmJlZEVuZXJneSI6MCwiQ3ZuQWJzb3JiZWRFbmVyZ3lVbml0cyI6IkZ0LWxiZiIsIkN2bkFic29yYmVkRW5lcmd5QWNjZXB0YW5jZUNyaXRlcmlhRm9yU3BlY2ltZW5TaXplVXNlZCI6IjAiLCJDdm5TaGVhckFyZWExKCUpIjowLCJDdm5TaGVhckFyZWEyKCUpIjowLCJDdm5TaGVhckFyZWEzKCUpIjowLCJDdm5BdmVyYWdlU2hlYXJBcmVhKCUpIjowLCJDdm5TaGVhckFyZWFBY2NlcHRhbmNlQ3JpdGVyaWFGb3JTcGVjaW1lblNpemVVc2VkIjowfX19fX0sInZhbGlkVW50aWwiOiIyMDI0LTEwLTMxVDAwOjAwOjAwWiIsImp0aSI6Imh0dHBzOi8vdmVyaWZpY2F0aW9uLmd0aS5lbmVyZ3kvdmMvMTU1NiIsIm5iZiI6MTY5ODcxMDQwMCwiaXNzIjoiZGlkOmp3azpleUpoYkdjaU9pSkZVekkxTmlJc0luVnpaU0k2SW5OcFp5SXNJbXQwZVNJNklrVkRJaXdpWTNKMklqb2lVQzB5TlRZaUxDSjRJam9pZWpoVFRsTllUVmd4VWpabFZFdDZTa2R0TFVFM1pXcEJaa1pzZFVSc2FVaEtkVzluVDJGUWMwUkVVU0lzSW5raU9pSkxVVXRCVFdWd1RVNTZkSEpzZVRCNk9ESTNNVGcwZERSUWRrRnVVMGxVTFcxTU1GRnNhVWcxZW5VMEluMCJ9.KXi3MEydDL9YgNQkMts47IsIQ23PYNwOnVoLaNOU0Jt6RE0HLjdOXe7B_fNDcRbyd_P_CbeTRcinOiOdXNwdow";
const PUB_KEY_JWK = {
  alg: "ES256",
  use: "sig",
  kty: "EC",
  crv: "P-256",
  x: "z8SNSXMX1R6eTKzJGm-A7ejAfFluDliHJuogOaPsDDQ",
  y: "KQKAMepMNztrly0z827184t4PvAnSIT-mL0QliH5zu4"
};

describe("JWT Verifiable Credential, should be", () => {
  let publicKey: KeyLike | Uint8Array;
  beforeAll(async () => {
    publicKey = await importJWK(PUB_KEY_JWK);
  });

  it("verifiable using a regular JWT library", async () => {
    // The verify function would throw an exception if it did not verify (see next test)
    const result = await jwtVerify(JWT_VC, publicKey);
    console.log(JSON.stringify(result));

    expect(result).toBeDefined();
    expect(result.protectedHeader).toMatchObject({
      alg: "ES256",
      typ: "JWT"
    });
    expect(result.payload).toMatchObject({
      iss:
        "did:jwk:eyJhbGciOiJFUzI1NiIsInVzZSI6InNpZyIsImt0eSI6IkVDIiwiY3J2IjoiUC0yNTYiLCJ4IjoiejhTTlNYTVgxUjZlVEt6SkdtLUE3ZWpBZkZsdURsaUhKdW9nT2FQc0REUSIsInkiOiJLUUtBTWVwTU56dHJseTB6ODI3MTg0dDRQdkFuU0lULW1MMFFsaUg1enU0In0",
      jti: "https://verification.gti.energy/vc/1556",
      nbf: 1698710400,
      validUntil: "2024-10-31T00:00:00Z",
      vc: {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          {
            "@vocab": "http://schema.gti.energy/"
          }
        ],
        credentialSubject: {
          Mtreport: {
            AnnexApplicability: {
              AnnexF: false,
              AnnexG: false,
              AnnexI: false,
              AnnexM: false,
              AnnexO: false
            },
            "CertificatePipeManufacturer’sFacility": "5L-0126",
            Charpyextra: {
              Charpyvnotch1: {
                CvnAbsorbedEnergy1: 194,
                CvnAbsorbedEnergy2: 194,
                CvnAbsorbedEnergy3: 164,
                CvnAbsorbedEnergyAcceptanceCriteriaForSpecimenSizeUsed: "25",
                CvnAbsorbedEnergyUnits: "Ft-lbf",
                CvnAverageAbsorbedEnergy: 184,
                "CvnAverageShearArea(%)": 100,
                "CvnShearArea1(%)": 100,
                "CvnShearArea2(%)": 100,
                "CvnShearArea3(%)": 100,
                CvnShearAreaAcceptanceCriteriaForSpecimenSizeUsed: 85,
                CvnTestLocation: "Weld Line",
                CvnTestOrientation: "T90",
                CvnTestSpecification: "ASTM A370",
                CvnTestSpecimenSize: 0.75,
                "CvnTestStatus-type": "INT",
                CvnTestTemperature: -20,
                CvnTestTemperatureUnits: "F"
              },
              Charpyvnotch2: {
                CvnAbsorbedEnergy1: 196,
                CvnAbsorbedEnergy2: 182,
                CvnAbsorbedEnergy3: 187,
                CvnAbsorbedEnergyAcceptanceCriteriaForSpecimenSizeUsed: "15",
                CvnAbsorbedEnergyUnits: "Ft-lbf",
                CvnAverageAbsorbedEnergy: 182,
                "CvnAverageShearArea(%)": 100,
                "CvnShearArea1(%)": 100,
                "CvnShearArea2(%)": 100,
                "CvnShearArea3(%)": 100,
                CvnShearAreaAcceptanceCriteriaForSpecimenSizeUsed: 85,
                CvnTestLocation: "HAZ",
                CvnTestOrientation: "T90",
                CvnTestSpecification: "ASTM A370",
                CvnTestSpecimenSize: 0.75,
                "CvnTestStatus-type": "INT",
                CvnTestTemperature: -20,
                CvnTestTemperatureUnits: "F"
              },
              Charpyvnotch3: {
                CvnAbsorbedEnergy1: 194,
                CvnAbsorbedEnergy2: 197,
                CvnAbsorbedEnergy3: 179,
                CvnAbsorbedEnergyAcceptanceCriteriaForSpecimenSizeUsed: "15",
                CvnAbsorbedEnergyUnits: "Ft-lbf",
                CvnAverageAbsorbedEnergy: 190,
                "CvnAverageShearArea(%)": 100,
                "CvnShearArea1(%)": 100,
                "CvnShearArea2(%)": 100,
                "CvnShearArea3(%)": 100,
                CvnShearAreaAcceptanceCriteriaForSpecimenSizeUsed: 85,
                CvnTestLocation: "Weld Line",
                CvnTestOrientation: "T90",
                CvnTestSpecification: "ASTM A370",
                CvnTestSpecimenSize: 0.75,
                "CvnTestStatus-type": "INT",
                CvnTestTemperature: -20,
                CvnTestTemperatureUnits: "F"
              },
              Charpyvnotch4: {
                CvnAbsorbedEnergy1: 191,
                CvnAbsorbedEnergy2: 195,
                CvnAbsorbedEnergy3: 190,
                CvnAbsorbedEnergyAcceptanceCriteriaForSpecimenSizeUsed: "25",
                CvnAbsorbedEnergyUnits: "Ft-lbf",
                CvnAverageAbsorbedEnergy: 192,
                "CvnAverageShearArea(%)": 100,
                "CvnShearArea1(%)": 100,
                "CvnShearArea2(%)": 100,
                "CvnShearArea3(%)": 100,
                CvnShearAreaAcceptanceCriteriaForSpecimenSizeUsed: 85,
                CvnTestLocation: "HAZ",
                CvnTestOrientation: "T90",
                CvnTestSpecification: "ASTM A370",
                CvnTestSpecimenSize: 0.75,
                "CvnTestStatus-type": "INT",
                CvnTestTemperature: -20,
                CvnTestTemperatureUnits: "F"
              },
              Charpyvnotch5: {
                CvnAbsorbedEnergy1: 0,
                CvnAbsorbedEnergy2: 0,
                CvnAbsorbedEnergy3: 0,
                CvnAbsorbedEnergyAcceptanceCriteriaForSpecimenSizeUsed: "0",
                CvnAbsorbedEnergyUnits: "Ft-lbf",
                CvnAverageAbsorbedEnergy: 0,
                "CvnAverageShearArea(%)": 0,
                "CvnShearArea1(%)": 0,
                "CvnShearArea2(%)": 0,
                "CvnShearArea3(%)": 0,
                CvnShearAreaAcceptanceCriteriaForSpecimenSizeUsed: 0,
                CvnTestLocation: "",
                CvnTestOrientation: "T90",
                CvnTestSpecification: "ASTM A370",
                CvnTestSpecimenSize: 0.75,
                "CvnTestStatus-type": "",
                CvnTestTemperature: 32,
                CvnTestTemperatureUnits: "F"
              }
            },
            Charpyproduction: {
              Charpyvnotch1: {
                CvnAbsorbedEnergy1: 111,
                CvnAbsorbedEnergy2: 92,
                CvnAbsorbedEnergy3: 112,
                CvnAbsorbedEnergyAcceptanceCriteriaForSpecimenSizeUsed: "25",
                CvnAbsorbedEnergyUnits: "Ft-lbf",
                CvnAverageAbsorbedEnergy: 105,
                "CvnAverageShearArea(%)": 100,
                "CvnShearArea1(%)": 100,
                "CvnShearArea2(%)": 100,
                "CvnShearArea3(%)": 100,
                CvnShearAreaAcceptanceCriteriaForSpecimenSizeUsed: 85,
                CvnTestLocation: "Body",
                CvnTestOrientation: "T90",
                CvnTestSpecification: "ASTM A370",
                CvnTestSpecimenSize: 0.75,
                "CvnTestStatus-type": "INT",
                CvnTestTemperature: -20,
                CvnTestTemperatureUnits: "F"
              },
              Charpyvnotch2: {
                CvnAbsorbedEnergy1: 151,
                CvnAbsorbedEnergy2: 136,
                CvnAbsorbedEnergy3: 103,
                CvnAbsorbedEnergyAcceptanceCriteriaForSpecimenSizeUsed: "15",
                CvnAbsorbedEnergyUnits: "Ft-lbf",
                CvnAverageAbsorbedEnergy: 130,
                "CvnAverageShearArea(%)": 100,
                "CvnShearArea1(%)": 100,
                "CvnShearArea2(%)": 100,
                "CvnShearArea3(%)": 100,
                CvnShearAreaAcceptanceCriteriaForSpecimenSizeUsed: 85,
                CvnTestLocation: "Body",
                CvnTestOrientation: "T90",
                CvnTestSpecification: "ASTM A370",
                CvnTestSpecimenSize: 0.75,
                "CvnTestStatus-type": "INT",
                CvnTestTemperature: -20,
                CvnTestTemperatureUnits: "F"
              }
            },
            Chemicalmodel: {
              Chemistrymodelh: {
                Alaluminum: 0.049,
                Bboron: 0.0001,
                Cacalcium: 0.0016,
                Ccarbon: 0.064,
                Ceiiwacceptancecriteria: 0.25,
                Ceiiwcarbonequivalent: 0,
                Cepcmacceptancecriteria: 0.25,
                Cepcmcarbon: 0.107,
                Chemistryteststatustypec: "INIT",
                Crchromium: 0.021,
                Cucopper: 0.009,
                Mnmanganese: 0.771,
                Momolybdenum: 0.002,
                Nbniobium: 0.043,
                Ninickel: 0.005,
                Nnitrogen: 0.0064,
                Pphosphorus: -5,
                Sampleid: "11/23",
                Samplesource: "Coil",
                Sisilicon: 0.069,
                Ssulfur: 0.002,
                Tititanium: 0.001,
                Vvanadium: 0.001
              },
              Chemistrymodelp1: {
                Alaluminum: 0.051,
                Bboron: 0,
                Cacalcium: 0.0033,
                Ccarbon: 0.079,
                Ceiiwacceptancecriteria: 0.25,
                Ceiiwcarbonequivalent: 0,
                Cepcmacceptancecriteria: 0.25,
                Cepcmcarbon: 0.123,
                Chemistryteststatustypec: "INIT",
                Crchromium: 0.026,
                Cucopper: 0.014,
                Mnmanganese: 0.757,
                Momolybdenum: 0.007,
                Nbniobium: 0.052,
                Ninickel: 0.035,
                Nnitrogen: 0.0062,
                Pphosphorus: 0.008,
                Sampleid: "0058",
                Samplesource: "Pipe",
                Sisilicon: 0.09,
                Ssulfur: 0.004,
                Tititanium: 0.001,
                Vvanadium: 0.002
              },
              Chemistrymodelp2: {
                Alaluminum: 0.031,
                Bboron: 0,
                Cacalcium: 0.0033,
                Ccarbon: 0.072,
                Ceiiwacceptancecriteria: 0.25,
                Ceiiwcarbonequivalent: 0,
                Cepcmacceptancecriteria: 0.25,
                Cepcmcarbon: 0.117,
                Chemistryteststatustypec: "INIT",
                Crchromium: 0.031,
                Cucopper: 0.015,
                Mnmanganese: 0.766,
                Momolybdenum: 0.007,
                Nbniobium: 0.05,
                Ninickel: 0.035,
                Nnitrogen: 0.0052,
                Pphosphorus: 0.01,
                Sampleid: "0061",
                Samplesource: "Pipe",
                Sisilicon: 0.103,
                Ssulfur: 0.004,
                Tititanium: 0.002,
                Vvanadium: 0.003
              }
            },
            CustomerAddress:
              "ACCOUNTS PAYABLE PO BOX 513 CHARLESTON, WV  25322",
            CustomerName: "MRC GLOBAL INC",
            CustomerOrder: "S 7A7 521746 ",
            DateOfCertification: "2020-03-03T15:06:21.595Z",
            HeatNumber: "232796",
            InspectionDocumentSpecification: " ISO 10474 :1991/EN 10204 :2004",
            Mechanicalmodel1: {
              Bendtests: {
                Bendtestspecification: "Lorem",
                Processbendtestpassfail: true
              },
              Deadweighttest: {
                "Dwttaveragesheararea%": 96,
                Dwttnotchtype: "Lorem",
                "Dwttsheararea1%": 91,
                "Dwttsheararea2%": -73,
                Dwttspecimensize: "Lorem",
                Dwttstandardused: "Lorem",
                Dwtttestpipenumber: "Lorem",
                Dwttteststatustype: "Lorem",
                Dwtttesttemperature: "Lorem",
                Dwtttesttemperatureunits: "Lorem"
              },
              Hardness: {
                Hardnesstestspecification: "Lorem",
                Hardnessteststatustype: "HRB",
                Hardnesstestunits: "kgf",
                Maxhardnessrecordedbody: 90,
                Maxhardnessrecordedhaz: 0,
                Maxhardnessrecordedweld: 0
              },
              Hydrostatictest: {
                Hydrostatictestresult: true,
                Specifiedminimumhydrostatictestpressureduration: 10,
                Specifiedminimumhydrostatictestpressurevalue: 1960,
                Testdurationunits: "Sec",
                Testpressureunits: "psi"
              },
              Ndtstatement:
                "NDT tested using an Ultrasonic test method calibrated ID & OD N-10 NOTCHES",
              Processflatteningtests: true,
              Processguidedbendtest: true,
              Sampleid: "0058",
              Samplesource: "Pipe",
              Tensiletests: {
                TensileSpecimenGageLength: 2,
                TensileTestYieldMeasurementPoint: "Lorem",
                TensileTestYieldStrengthUnits: "ksi",
                Tensilespecimengagelengthunits: "in",
                TestLocation: "Body",
                TestOrientation: "Transverse",
                TestSpecification: "ASTM A370",
                TestSpecimenSize: "1-1/2 in X 2 in",
                TestSpecimenType: "full section",
                TestStatus: "INIT",
                "TestTotal%ElongationAtFracture": 32.5,
                TestYieldStrength: 61.7,
                TestYieldToTensileRatio: 0.79,
                Testtensilestrengthpipebody: 77.8,
                Testtensilestrengthpipebodyunits: "ksi",
                Testtensilestrengthunits: "ksi",
                Testtensilestrengthweld: 72.1
              }
            },
            Mechanicalmodel2: {
              Bendtests: {
                Bendtestspecification: "Lorem",
                Processbendtestpassfail: true
              },
              Deadweighttest: {
                "Dwttaveragesheararea%": 11,
                Dwttnotchtype: "Lorem",
                "Dwttsheararea1%": -42,
                "Dwttsheararea2%": -64,
                Dwttspecimensize: "Lorem",
                Dwttstandardused: "Lorem",
                Dwtttestpipenumber: "Lorem",
                Dwttteststatustype: "Lorem",
                Dwtttesttemperature: "Lorem",
                Dwtttesttemperatureunits: "Lorem"
              },
              Hardness: {
                Hardnesstestspecification: "Lorem",
                Hardnessteststatustype: "HRB",
                Hardnesstestunits: "kgf",
                Maxhardnessrecordedbody: 86,
                Maxhardnessrecordedhaz: 0,
                Maxhardnessrecordedweld: 0
              },
              Hydrostatictest: {
                Hydrostatictestresult: true,
                Specifiedminimumhydrostatictestpressureduration: 10,
                Specifiedminimumhydrostatictestpressurevalue: 1960,
                Testdurationunits: "sec",
                Testpressureunits: "psi"
              },
              Ndtstatement:
                "NDT tested using an Ultrasonic test method calibrated ID & OD N-10 NOTCHES",
              Processflatteningtests: true,
              Processguidedbendtest: true,
              Sampleid: "0061",
              Samplesource: "Coil",
              Tensiletests: {
                TensileSpecimenGageLength: 2,
                TensileTestYieldMeasurementPoint: "Lorem",
                TensileTestYieldStrengthUnits: "ksi",
                Tensilespecimengagelengthunits: "in",
                TestLocation: "Body",
                TestOrientation: "Transverse",
                TestSpecification: "ASTM A370",
                TestSpecimenSize: "1-1/2 in X 2 in",
                TestSpecimenType: "full section",
                TestStatus: "INIT",
                "TestTotal%ElongationAtFracture": 39.5,
                TestYieldStrength: 62.1,
                TestYieldToTensileRatio: 0.81,
                Testtensilestrengthpipebody: 76.9,
                Testtensilestrengthpipebodyunits: "ksi",
                Testtensilestrengthunits: "ksi",
                Testtensilestrengthweld: 72.4
              }
            },
            MeltingVendor: "(G) Cleveland Cliffs, Indiana Harbor",
            MeltingVendorAddress:
              "3210 Watling Street East Chicago, IN 46312 USA",
            MtrNumberIdentifier: "1556",
            PipeDescription: {
              Api5lEditionNumber: "45 - 7/1/2013, 46 - 5/1/2019",
              PipeAdditionalDescription: "API Line Pipe",
              PipeGrade: "X52M",
              PipeNominalOutsideDiameter: 20,
              PipeNominalOutsideDiameterUnits: "in",
              PipeNominalWallThickness: 0.375,
              PipeNominalWallThicknessUnits: "in",
              PipeType: "HFW",
              ProductSpecificationLevel: "2",
              Specifications: "API 5L"
            },
            PipeNumber: "API Decision Needed",
            ProcessControls: {
              "MinimumTemperatureForHeatTreatment,WeldSeamHfwOnly": 1600,
              "MinimumTemperatureUnitsForHeatTreatment,WeldSeam(hfwOnly)": "F"
            },
            ProducerAddress: "1501 31st Avenue North, Birmingham, AL 35207",
            ProducerName: "American Cast Iron Pipe Co",
            ReportType: "3.1",
            SerialNumber: ["Lorem", "Lorem"],
            SpecialNotes:
              "HARDNESS IS 22 HRC MAX.  THIS ORDER WILL ALSO MEET ASTM A53 GRADE BAND ASME SA 53 GRADE B.  PIPE WERE MANUFACTURED IN ACCORDANCE WITH MRC 'STANDARD FOR PURCHASE OF LINE PIPE FOR MRC GLOBAL INVENTORY' DOCUMENT NUMBER STD-LPOl REV 6,  REV. DATE 11 2020-09-23 11 •  NDT tested using an Ultrasonic test method calibrated ID & OD N-10 NOTCHES. Hydrostatic test duration 10 seconds. Max allowable C.E. PCM .25.  Minimum weld seam anneal temperature 16 00 degrees F for all pipe.  Charpy acceptance criteria Min. Energy 15/Heat. Min. shear area 85/Heat.",
            SteelSupplierAddress:
              "3210 Watling St. / East Chicago, IN 46312 1 AM/NS Way / Calvert, AL 36513 ",
            SteelSupplierName:
              "Arcelor - Mittal Steel (I.H. West) , AM/NS- Calvert (Roll) ",
            TestComments:
              "All tests are from the body of the pipe in the transverse direction unless otherwise noted. Standard flat tensile gage length 1-1/2' x 2'.  Pipe body test location: Tensile 180; CVN T90.    Coils used for this order were melted and manufactured in the USA.     We hereby certify that the above figures are correct as contained in the records of this company, and that the pipe were manufactured, tested, and inspected in compliance with the Latest edition of the applicable  Specification at American Steel Pipe (ASP) located at 1500 32nd Avenue North, Birmingham, AL 35207 (USA). ",
            ZNumber: "API Decision Needed"
          }
        },
        type: ["VerifiableCredential"]
      }
    });
  });

  it("throw an error in case the signature is invalid", async () => {
    await expect(
      jwtVerify(JWT_VC.replace("OdXNwdow", "1dXNwdow"), publicKey)
    ).rejects.toThrow();
  });
  it("throw an error in case the header is invalid", async () => {
    await expect(
      jwtVerify(JWT_VC.replace("kpXVCJ9", "kpXVCJ8"), publicKey)
    ).rejects.toThrow();
  });
  it("throw an error in case the payload is invalid", async () => {
    await expect(
      jwtVerify(JWT_VC.replace("JAY29ud", "JAY29uc"), publicKey)
    ).rejects.toThrow();
  });
  it("throw an error in case the JWK key is not the public key of the signed JWT", async () => {
    await expect(
      jwtVerify(
        JWT_VC,
        await importJWK({
          kty: "EC",
          use: "sig",
          crv: "P-256",
          x: "xNCU9OyorlgxWmolagucwuWyKrKxBnEmEUY6TPEF7kY",
          y: "rmiUJLLX3BX5OVf0PEJdz8nS3aX3ylw9s7Nn_wxb22Y",
          alg: "ES256"
        })
      )
    ).rejects.toThrow();
  });
});
