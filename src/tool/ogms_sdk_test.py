import sys
sys.path.append('D:\\Program\\Parallel\\')
from OGMS_Debug_python import OGMSService_DEBUG

import json

server = OGMSService_DEBUG.CreateServer("172.21.212.119", 8060)
server.connect()
if server.connect():
    access = server.getServiceAccess()
    list_ms = access.getModelServicesList()
    # for index, item in enumerate(list_ms):
    #     print "ID : " + item.id + " - Name : " + item.name + " - Type : " + item.type + '\n'

    model_shortpath = access.getModelServiceByID('5abd7447beb772033cdee5df')
    mdl = json.loads(model_shortpath.xml)
    recordid = model_shortpath.invoke([access.createDataConfigurationItem('ShortestPath', 'SearchID', 'gd_a66131b0-33a8-11e8-aca6-6dce66ba6d83')])
    record = access.getModelServiceRunningRecordByID(recordid)
    instance = access.getModelServiceInstanceByGUID(record.guid)
    instance.wait4Status(4, 7200, True)
    print ("AreaD8 has been finished")
    record.refresh()
    for item in record.outputs:
        dat = access.getDataByID(item.dataid)
        dat.save("D:\\" + item.eventname + ".txt")