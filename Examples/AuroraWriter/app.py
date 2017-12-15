import sys
import logging
import rds_config
import pymysql
#rds settings
rds_host  = "pl-aurora-cluster-1.cluster-c9r73hnq9a2r.us-east-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    logger.info("ATTEMPTING: Connection to RDS mysql instance")
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")

def handler(event, context):
    """
    This function fetches content from mysql RDS instance
    """
    p = event["pid"]
    q = event["quantity"]
    
    logger.info("RECEIVED: pid={}, quantity={}".format(p, q))
    
    args = (p, q)
    
    item_count = 0
    
    with conn.cursor() as cur:
        cur.execute("insert into orders (pid, quantity) values(%s,%s);", args)
        conn.commit()
        cur.execute("select * from orders")
        for row in cur:
            item_count += 1
            logger.info(row)
            #print(row)
    return "Added %d items from RDS MySQL table" %(item_count)